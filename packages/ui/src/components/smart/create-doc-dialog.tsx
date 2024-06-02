import { Model } from "@melony/types";

import { Button } from "../ui/button";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { SmartForm } from "./smart-form";
import { useCreate } from "@/hooks";
import { X } from "lucide-react";

export function CreateDocDialog({
	model,
	open,
	onClose,
}: {
	model: Model;
	open: boolean;
	onClose: () => void;
}) {
	const { mutate: create, isPending: isCreating } = useCreate({
		model,
		onSuccess: () => {
			onClose();
		},
	});

	return (
		<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="max-w-[44rem]">
				<DialogHeader>
					<div className="flex justify-between items-center">
						<DialogTitle>Create</DialogTitle>
						<div className="flex gap-2 items-center">
							<DialogClose asChild>
								<Button size="sm" variant="ghost">
									<X className="h-4 w-4" />
								</Button>
							</DialogClose>
						</div>
					</div>
				</DialogHeader>

				<DialogBody>
					<SmartForm
						model={model}
						onSubmit={create}
						isSubmitting={isCreating}
					/>
				</DialogBody>
			</DialogContent>
		</Dialog>
	);
}
