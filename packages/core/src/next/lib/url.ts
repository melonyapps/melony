import { headers } from "next/headers";

export const getPathname = () => {
	const headersList = headers();
	const xUrl = headersList.get("x-url") || "";

	const url = new URL(xUrl);
	const pathname = url.pathname;

	return pathname;
};
