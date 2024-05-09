import React from "react";
import { useDocument } from "@melony/core";
import { Skeleton } from "@melony/ui";
import { Heading } from "./heading";

export function DocumentHeading({}: {}): JSX.Element {
	const { data, isLoading } = useDocument();

	return (
		<Heading>
			{isLoading ? <Skeleton className="w-40 h-4" /> : data?.title || ""}
		</Heading>
	);
}
