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
import { useUpdate } from "@/hooks";
import { X } from "lucide-react";
import { SmartTabbedRelatedLists } from "./smart-tabbed-related-lists";
import { Actions } from "./actions";
import { DocMenu } from "./doc-menu";
import { useApp } from "../providers/app-provider";

export function ViewDocDialog({
	data,
	model,
	open,
	onClose,
}: {
	data: any;
	model: Model;
	open: boolean;
	onClose: () => void;
}) {
	const { getModelActions } = useApp();

	const { mutate: update, isPending: isUpdating } = useUpdate({
		model,
		onSuccess: () => {
			onClose();
		},
	});

	return (
		<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="max-w-[80rem]">
				<DialogHeader>
					<div className="flex justify-between items-center">
						<DialogTitle>Update</DialogTitle>
						<div className="flex gap-1 items-center">
							<Actions
								model={model}
								docs={[data]}
								actions={getModelActions(model.name)}
							/>

							<DocMenu model={model} data={data} />

							<DialogClose asChild>
								<Button size="sm" variant="ghost">
									<X className="h-4 w-4" />
								</Button>
							</DialogClose>
						</div>
					</div>
				</DialogHeader>

				<DialogBody>
					<div className="flex flex-col gap-4">
						<SmartForm
							model={model}
							values={data}
							onSubmit={update}
							isSubmitting={isUpdating}
						/>

						<SmartTabbedRelatedLists model={model} doc={data || {}} />
					</div>
				</DialogBody>
			</DialogContent>
		</Dialog>
	);
}
