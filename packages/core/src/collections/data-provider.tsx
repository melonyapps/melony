"use client";

import { DataContext, DataProviderProps } from "..";

export function DataProvider({
	provider,
	children,
}: {
	provider: DataProviderProps;
	children: React.ReactNode;
}) {
	return (
		<DataContext.Provider value={provider}>{children}</DataContext.Provider>
	);
}
