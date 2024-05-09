"use client";

import * as React from "react";
import { Button } from "@melony/ui";
import { Plus } from "lucide-react";
import { useCollection } from "@melony/core";
import { useMelonyNavigate } from "../hooks/use-melony-navigate";

export function CreateButton() {
	const navigate = useMelonyNavigate();
	const { slug, view } = useCollection();

	return (
		<Button
			onClick={() => {
				navigate(`/c/${slug}/v/${view?.slug || "base"}/d/create`);
			}}
			variant="outline"
		>
			<Plus className="h-4 w-4 mr-2" /> Create
		</Button>
	);
}
