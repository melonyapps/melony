"use client";

import * as React from "react";
import { Button } from "@melony/ui";
import { Plus } from "lucide-react";
import { useCollection } from "@melony/core";
import { useNavigate } from "react-router-dom";

export function CreateButton() {
	const navigate = useNavigate();
	const { slug } = useCollection();

	return (
		<Button
			onClick={() => {
				navigate(`/${slug}/create`);
			}}
			variant="outline"
		>
			<Plus className="h-4 w-4 mr-2" /> Create
		</Button>
	);
}
