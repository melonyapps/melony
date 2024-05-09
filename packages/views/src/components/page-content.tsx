import * as React from "react";
import { useCollection } from "@melony/core";
import { Card, CardContent } from "@melony/ui";

export function PageContent({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) {
	const { view } = useCollection();

	return (
		<Card className="flex-1 flex flex-col overflow-hidden">
			<CardContent className="flex-1 overflow-auto p-0">{children}</CardContent>
		</Card>
	);
}
