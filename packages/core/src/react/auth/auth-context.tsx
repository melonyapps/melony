import * as React from "react";
import { AuthProviderProps } from "../../types";

export type IdentityProps = {
  _id: string;
  email: string;
  displayName: string;
  avatar?: string;
};

export const AuthContext = React.createContext<AuthProviderProps>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  // getIdentity: () => Promise.resolve<IdentityProps | undefined>(undefined),
  // checkAuth: () => Promise.resolve(),
});
