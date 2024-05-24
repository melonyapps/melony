import type { Metadata } from "next";
import "@melony/ui/globals.css";

export const metadata: Metadata = {
	title: "Saamkroshi",
	description: "Built with Melony",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
