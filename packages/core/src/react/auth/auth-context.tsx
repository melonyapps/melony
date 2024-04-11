"use client";

import * as React from "react";
import { AuthProvider } from "../../types";

export type IdentityProps = {
  _id: string;
  email: string;
  displayName: string;
  avatar?: string;
};

export const AuthContext = React.createContext<AuthProvider>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  // getIdentity: () => Promise.resolve<IdentityProps | undefined>(undefined),
  // checkAuth: () => Promise.resolve(),
});
