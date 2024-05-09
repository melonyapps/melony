import * as React from "react";

export function Header({
	title,
	toolbar,
}: {
	title: string;
	toolbar?: JSX.Element;
}) {
	return (
		<div className="flex items-center justify-between gap-4">
			<div className="leading-9">{title}</div>
			{toolbar}
		</div>
	);
}
