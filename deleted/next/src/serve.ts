import { NextRequest, NextResponse } from "next/server";
import { getUser, login, logout } from "./actions/auth";
import { AdapterProps } from "@melony/core";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

type ServeProps = {
	db: AdapterProps;
};

export const serve = ({ db }: ServeProps) => {
	return {
		GET: async (req: NextRequest) => {
			const searchParams = req.nextUrl.searchParams;
			const splittedPathname = req.nextUrl.pathname.split("/");

			const dir = path.resolve("./src");
			const filenames = fs.readdirSync(dir);

			console.log(filenames);

			switch (splittedPathname.length) {
				case 3:
					if (splittedPathname[2] === "suggestions") {
						try {
							const res = await db.getSuggestions({
								collectionSlug: searchParams.get("collectionSlug") || "unknown",
							});

							return Response.json(res);
						} catch (err) {
							return NextResponse.json({});
						}
					}

					try {
						const res = await db.getDocuments({
							collectionSlug: splittedPathname[2] || "unknown",
							// searchTerm,
							// filter,
							// sort,
						});

						return NextResponse.json(res);
					} catch (err) {
						return NextResponse.json({});
					}
				case 4:
					try {
						const res = await db.getDocument({
							collectionSlug: splittedPathname[2] || "unknown",
							docId: splittedPathname[3] || "unknown",
						});

						return NextResponse.json(res);
					} catch (err) {
						return NextResponse.json({});
					}

				default:
					return NextResponse.json({});
			}
		},
		POST: async (req: NextRequest) => {
			const splittedPathname = req.nextUrl.pathname.split("/");

			try {
				if (req.nextUrl.pathname === "/api/login") {
					const data = await req.json();
					const user = await login({ db, payload: data });
					if (user) {
						return NextResponse.json({
							success: true,
							user: {
								email: user?.email,
								image: user?.image,
								name: user?.name,
							},
						});
					} else {
						return NextResponse.json({
							error: "Wrong credentials",
						});
					}
				}

				if (req.nextUrl.pathname === "/api/logout") {
					await logout();
					return NextResponse.json({
						success: true,
					});
				}

				if (req.nextUrl.pathname === "/api/session") {
					const user = await getUser({ db });
					return NextResponse.json({
						user,
					});
				}

				if (req.nextUrl.pathname === "/api/upload") {
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
								const filePath =
									date.toISOString().slice(0, 7) + "/" + item.name;

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

								const fileRes = await db.createDocument({
									collectionSlug: "files",
									data: {
										downloadUrl,
										originalName: item.name,
									},
									auth: {}, // TODO: needs to be removed
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
				if (splittedPathname.length === 3) {
					try {
						const data = await req.json();

						const collectionSlug = splittedPathname[2] || "unknown";

						// const collection = collections.find((x) => x.slug === collectionSlug);

						// const refinedData = refineData({ data, collection });

						await db.createDocument({
							collectionSlug,
							data,
							auth: {},
						});

						// eventEmitter.emit("docChange", {
						// 	type: "create",
						// });

						return Response.json({});
					} catch (err) {}
				}
			} catch (err) {
				return NextResponse.json({
					error: "Smthng went wrong",
				});
			}
		},
		PUT: async (req: NextRequest) => {
			const splittedPathname = req.nextUrl.pathname.split("/");

			// update doc
			if (splittedPathname.length === 4) {
				try {
					const collectionSlug = splittedPathname[2] || "unknown";
					const docId = splittedPathname[3] || "unknown";

					// const collection = collections.find((x) => x.slug === collectionSlug);

					const data = await req.json();

					// const refinedData = refineData({ data, collection });

					await db.updateDocument({
						collectionSlug,
						docId,
						data,
					});

					// eventEmitter.emit("docChange", {
					// 	type: "update",
					// 	collectionSlug,
					// });

					return Response.json({});
				} catch (err) {}
			}

			return Response.json({});
		},
		DELETE: async (req: NextRequest) => {
			const splittedPathname = req.nextUrl.pathname.split("/");

			// delete doc
			if (splittedPathname.length === 4) {
				try {
					const collectionSlug = splittedPathname[2] || "unknown";
					const docId = splittedPathname[3] || "unknown";

					await db.deleteDocument({
						collectionSlug,
						docId,
					});

					// eventEmitter.emit("docChange", {
					// 	type: "delete",
					// 	collectionSlug,
					// });

					return Response.json({});
				} catch (err) {}
			}

			return Response.json({});
		},
	};
};
