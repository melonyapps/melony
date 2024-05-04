"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { AuthContext, ConfigProvider, DataContext } from "@melony/core/react";
import { dataProvider as melonyDataProvider } from "@melony/data-provider";
import { authProvider as melonyAuthProvider } from "@melony/auth-provider";
import { ThemeProvider } from "@melony/ui/theme-provider";
import { Config } from "@melony/core/config";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
		},
	},
});

type MelonyProviderProps = {
	children: React.ReactNode;
	config: Config;
};

export function MelonyProvider({ children, config }: MelonyProviderProps) {
	const defaultDataProvider = melonyDataProvider({
		apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
	});

	const defaultAuthProvider = melonyAuthProvider({
		apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
	});

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<AuthContext.Provider value={defaultAuthProvider}>
					<DataContext.Provider value={defaultDataProvider}>
						<ConfigProvider config={config}>
							<ThemeProvider>{children}</ThemeProvider>
						</ConfigProvider>
					</DataContext.Provider>
				</AuthContext.Provider>
			</QueryClientProvider>
		</SessionProvider>
	);
}
