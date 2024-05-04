import { CollectionProvider } from "@melony/core/react";

export const metadata = {
	title: "Melony",
};

export default async function ProjectsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <CollectionProvider slug="65a30f4db68869084c9faa42">{children}</CollectionProvider>;
}
