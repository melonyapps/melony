"use client";

import { AuthProviderProps } from "..";
import { AuthContext } from "./auth-context";

export function AuthProvider({
	provider,
	children,
}: {
	provider: AuthProviderProps;
	children: React.ReactNode;
}) {
	return (
		<AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
	);
}
