import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export const middleware: any = auth((req) => {
	const { nextUrl } = req;

	const isAuthenticated = !!req.auth;
	const isPublicRoute = ["/login"].includes(nextUrl.pathname);

	if (isPublicRoute && isAuthenticated)
		return Response.redirect(new URL("/", nextUrl));

	if (!isAuthenticated && !isPublicRoute)
		return Response.redirect(new URL("/login", nextUrl));
});
