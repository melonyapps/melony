import { NextRequest, NextResponse } from "next/server";
import { Config } from "@melony/core/config";
import { getParams, hashPassword, refineData } from "./utils";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import EventEmitter from "events";
import queryString from "qs";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FilterOperator } from "@melony/core/filter";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const serve = (config: Config) => {
	const { id, adapter, collections, triggers } = config;

	const dbCrudAdapter = adapter({ id, collections });

	const { handlers, auth, signIn, signOut } = NextAuth({
		...authConfig,
		adapter: dbCrudAdapter.auth,
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			}),
			CredentialsProvider({
				credentials: {
					email: {},
					password: {},
				},
				authorize: async (credentials) => {
					const res = await dbCrudAdapter.getDocuments({
						collectionSlug: "users",
						filter: [
							{
								field: "email",
								operator: FilterOperator.Is,
								value: credentials.email,
							},
						],
					});

					if (res.docs.length > 0) {
						const user: any = res.docs[0];

						if (
							hashPassword((credentials?.password as string) || "") ===
							user?.password
						) {
							return user;
						}
					}

					return null;
				},
			}),
		],
	});

	const eventEmitter = new EventEmitter();

	eventEmitter.on("docChange", async (changeEvent) => {
		Object.keys(triggers).map((triggerKey) => {
			const trigger = triggers[triggerKey];

			if (trigger?.collectionSlug === changeEvent.collectionSlug) {
				if (trigger?.on?.includes(changeEvent.type)) {
					// execute
					trigger.task({ dbCrudAdapter, type: changeEvent.type }); // TODO: dbCrudAdapter or db? need to decide
				}
			}
		});
	});

	return {
		GET: async (req: NextRequest) => {
			const params = getParams(req);
			const searchParams = req.nextUrl.searchParams;
			const search = req.nextUrl.search;

			const parsedQs = queryString.parse(search);
			const filter = parsedQs?.["filter"];
			const sort = parsedQs?.["sort"];
			const searchTerm = parsedQs?.["searchTerm"];

			// auth (used for callbacks)
			if (params?.[0] === "auth") {
				return handlers.GET(req);
			}

			if (params?.[0] === "init") {
				return Response.json(config);
			}

			// db actions
			// length === 1 - list
			if (params.length === 1) {
				if (params[0] === "suggestions") {
					try {
						const res = await dbCrudAdapter.getSuggestions({
							collectionSlug: searchParams.get("collectionSlug") || "unknown",
						});

						return Response.json(res);
					} catch (err) {
						return Response.json({});
					}
				}

				const collectionSlug = params[0] || "unknown";

				try {
					const res = await dbCrudAdapter.getDocuments({
						collectionSlug,
						searchTerm,
						filter,
						sort,
					});

					return Response.json(res);
				} catch (err) {
					return Response.json({});
				}
			}

			// length === 2 - show
			if (params.length === 2) {
				const collectionSlug = params[0] || "unknown";
				const docId = params[1] || "unknown";

				try {
					const res = await dbCrudAdapter.getDocument({
						collectionSlug,
						docId,
					});

					return Response.json(res);
				} catch (err) {
					return Response.json({});
				}
			}

			return Response.json({});
		},
		POST: async (req: NextRequest) => {
			const params = getParams(req);

			if (params?.[0] === "login") {
				try {
					const data = await req.json();

					if (data?.email) {
						await signIn("credentials", { ...data, redirect: false });

						return NextResponse.json({ success: true });
					}

					if (data?.provider === "google") {
						const redirectUrl = await signIn("google", { redirect: false });
						return NextResponse.json({ redirectUrl });
					}
				} catch (err) {
					return NextResponse.json({ error: "Error" }, { status: 401 });
				}
			}

			if (params?.[0] === "logout") {
				try {
					await signOut({ redirect: false });

					return NextResponse.json({ redirectUrl: "/login" });
				} catch (err) {
					return Response.json({});
				}
			}

			if (params?.[0] === "upload") {
				const Bucket = process.env.AMPLIFY_BUCKET;

				let space = new S3Client({
					forcePathStyle: false, // Configures to use subdomain/virtual calling format.
					endpoint: `https://${process.env.AWS_REGION}.digitaloceanspaces.com`,
					region: "us-east-1", // aws specific, do not pay attention
					credentials: {
						accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
						secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
					},
				});

				try {
					const formData = await req.formData();
					const files = formData.getAll("files") as File[];

					const filesRes = await Promise.all(
						files.map(async (item) => {
							const date = new Date();
							const filePath = date.toISOString().slice(0, 7) + "/" + item.name;

							let Body;
							try {
								Body = (await item.arrayBuffer()) as Buffer;
							} catch (err) {
								console.log(err);
							}

							await space.send(
								new PutObjectCommand({
									Bucket,
									Key: filePath,
									Body,
									ACL: "public-read",
								}),
								{},
							);

							const downloadUrl = `https://${process.env.AMPLIFY_BUCKET}.${process.env.AWS_REGION}.cdn.digitaloceanspaces.com/${filePath}`;

							const fileRes = await dbCrudAdapter.createDocument({
								collectionSlug: "files",
								data: {
									downloadUrl,
									originalName: item.name,
								},
								auth,
							});

							return { ...fileRes, downloadUrl };
						}),
					);

					return NextResponse.json({ files: filesRes });
				} catch (err) {
					console.log(err);
					return Response.json({ error: "Error during file upload" });
				}
			}

			// create
			if (params.length === 1) {
				try {
					const data = await req.json();

					const collectionSlug = params[0] || "unknown";

					const collection = collections.find((x) => x.slug === collectionSlug);

					const refinedData = refineData({ data, collection });

					await dbCrudAdapter.createDocument({
						collectionSlug,
						data: refinedData,
						auth,
					});

					eventEmitter.emit("docChange", {
						type: "create",
					});

					return Response.json({});
				} catch (err) {}
			}

			return Response.json({});
		},
		PUT: auth(async (req) => {
			const params = getParams(req);

			// update doc
			if (params.length === 2) {
				try {
					const collectionSlug = params[0] || "unknown";
					const docId = params[1] || "unknown";

					const collection = collections.find((x) => x.slug === collectionSlug);

					const data = await req.json();

					const refinedData = refineData({ data, collection });

					await dbCrudAdapter.updateDocument({
						collectionSlug,
						docId,
						data: refinedData,
					});

					eventEmitter.emit("docChange", {
						type: "update",
						collectionSlug,
					});

					return Response.json({});
				} catch (err) {}
			}

			return Response.json({});
		}),
		DELETE: auth(async (req) => {
			const params = getParams(req);

			// delete doc
			if (params.length === 2) {
				try {
					const collectionSlug = params[0] || "unknown";
					const docId = params[1] || "unknown";

					await dbCrudAdapter.deleteDocument({
						collectionSlug,
						docId,
					});

					eventEmitter.emit("docChange", {
						type: "delete",
						collectionSlug,
					});

					return Response.json({});
				} catch (err) {}
			}

			return Response.json({});
		}),
	};
};
