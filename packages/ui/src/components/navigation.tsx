"use client";

import { Folder } from "lucide-react";
import { cn } from "../lib";

export function Navigation({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) {
	return <div className="flex flex-col">{children}</div>;
}

export function NavigationItem({
	as,
	title,
	active,
	icon,
	href,
}: {
	as: any;
	title?: string;
	active?: boolean;
	icon?: any;
	href: string;
}) {
	const Comp = as || "div";

	return (
		<Comp
			className={cn(
				"px-2 h-9 relative cursor-pointer inline-flex overflow-hidden items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md justify-start",
				{
					"text-accent-foreground bg-muted": active,
				},
			)}
			href={href}
		>
			<Folder className="h-4 w-4 mr-2" />
			<span className="block truncate">{title}</span>
		</Comp>
	);
}
