"use client";

import { Button } from "@melony/views";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateButton() {
	const router = useRouter();

	return (
		<Button
			onClick={() => {
				router.push("/projects/create");
			}}
		>
			<Plus className="h-4 w-4 mr-2" /> Create
		</Button>
	);
}
