"use client";

import { ConfigContext } from ".";
import { Config } from "../config";

export function ConfigProvider({
	config,
	children,
}: {
	config: Config;
	children: React.ReactNode;
}) {
	const value = { config };

	return (
		<ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
	);
}
