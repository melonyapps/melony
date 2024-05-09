"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { config } from "@/melony.config";
import { App } from "@melony/views";
import { AuthProvider, ConfigProvider, DataProvider } from "@melony/core";
import { authProvider } from "@melony/auth-provider";
import { dataProvider } from "@melony/data-provider";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
		},
	},
});

export default function Layout() {
	return (
		<QueryClientProvider client={queryClient}>
			<ConfigProvider config={config}>
				<AuthProvider provider={authProvider({ apiUrl: "http://localhost:3000/api" })}>
					<DataProvider provider={dataProvider({ apiUrl: "http://localhost:3000/api" })}>
						<App />
					</DataProvider>
				</AuthProvider>{" "}
			</ConfigProvider>
		</QueryClientProvider>
	);
}
