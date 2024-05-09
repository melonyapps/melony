import { NextRequest, NextResponse } from "next/server";
import { getUser, login, logout } from "./actions/auth";
import { AdapterProps } from "@melony/core";

type ServerProps = {
	db: AdapterProps;
};

export const serve = ({ db }: ServerProps) => {
	return {
		GET: async (req: NextRequest) => {
			const splittedPathname = req.nextUrl.pathname.split("/");

			switch (splittedPathname.length) {
				case 3:
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
			} catch (err) {
				return NextResponse.json({
					error: "Smthng went wrong",
				});
			}
		},
		PUT: async (req: NextRequest) => {},
		DELETE: async (req: NextRequest) => {},
	};
};
