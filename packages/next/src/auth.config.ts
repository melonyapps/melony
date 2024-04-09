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
  // callbacks: {
  //   authorized({ auth }) {
  //     const isAuthenticated = !!auth?.user;

  //     return isAuthenticated;
  //   },
  // },
  providers: [],
} satisfies NextAuthConfig;
