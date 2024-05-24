import React from "react";
import { Card } from "./ui/card";

export function Page({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div id="page" className="h-screen p-2 flex flex-col">
			<div className="pb-3 pt-1">
				<div className="font-semibold">{title}</div>
			</div>

			<div className="flex-1">
				<Card className="h-full">{children}</Card>
			</div>
		</div>
	);
}
