import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth_error",
    signIn: "/login",
    signOut: "/logout",
  },
  providers: [],
} satisfies NextAuthConfig;
