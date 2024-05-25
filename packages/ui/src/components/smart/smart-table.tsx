import React from "react";
import { Model } from "@melony/types";

import { DataTable } from "../data-table";
import { useAction } from "../providers/action-provider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { SmartForm } from "./smart-form";
import { useCreate, useUpdate, useList, useDelete } from "@/hooks";
import { EllipsisVertical, X } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ConfirmDialog } from "../confirm-dialog";

export function SmartTable({ model }: { model: Model }) {
	const [activeDoc, setActiveDoc] = React.useState<{
		mode: "show" | "update" | "create" | "delete";
		data?: any;
	} | null>(null);

	const { getModelActions } = useAction();

	const { data = [], isLoading } = useList({
		modelName: model.name,
	});

	const { mutate: create, isPending: isCreating } = useCreate({
		modelName: model.name,
		onSuccess: () => {
			setActiveDoc(null);
		},
	});

	const { mutate: update, isPending: isUpdating } = useUpdate({
		modelName: model.name,
		onSuccess: () => {
			setActiveDoc(null);
		},
	});

	const { mutate: remove, isPending: isRemoving } = useDelete({
		modelName: model.name,
		onSuccess: () => {
			setActiveDoc(null);
		},
	});

	const modelActions = getModelActions(model.name);

	console.log(modelActions);

	return (
		<div id="table" className="h-full flex flex-col">
			<div className="flex justify-between items-center p-2">
				<div>
					<Input placeholder="Search..." />
				</div>
				<div>
					<Button
						onClick={() => {
							setActiveDoc({ mode: "create" });
						}}
					>
						Create
					</Button>
				</div>
			</div>
			<div className="flex-1">
				<DataTable
					columns={model.fields.map((field) => ({
						accessorKey: field.name,
					}))}
					data={data}
					isLoading={isLoading}
					onClickRow={(data) => {
						setActiveDoc({ mode: "update", data });
					}}
				/>
			</div>

			<Dialog
				open={activeDoc?.mode === "create"}
				onOpenChange={(open) => !open && setActiveDoc(null)}
			>
				<DialogContent className="max-w-[44rem]">
					<DialogHeader>
						<DialogTitle>Create</DialogTitle>
					</DialogHeader>

					<SmartForm
						model={model}
						onSubmit={create}
						isSubmitting={isCreating}
					/>
				</DialogContent>
			</Dialog>

			<Dialog
				open={activeDoc?.mode === "update"}
				onOpenChange={(open) => !open && setActiveDoc(null)}
			>
				<DialogContent className="max-w-[44rem]">
					<DialogHeader>
						<div className="flex justify-between items-center">
							<DialogTitle>Update</DialogTitle>
							<div className="flex gap-2 items-center">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button size="sm" variant="ghost">
											<EllipsisVertical className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem
											onClick={() => {
												setActiveDoc((prev) => ({
													mode: "delete",
													data: prev?.data,
												}));
											}}
										>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>

								<DialogClose asChild>
									<Button size="sm" variant="ghost">
										<X className="h-4 w-4" />
									</Button>
								</DialogClose>
							</div>
						</div>
					</DialogHeader>

					<SmartForm
						model={model}
						values={activeDoc?.data}
						onSubmit={update}
						isSubmitting={isUpdating}
					/>
				</DialogContent>
			</Dialog>

			<ConfirmDialog
				open={activeDoc?.mode === "delete"}
				onClose={() => setActiveDoc(null)}
				onConfirm={() => {
					remove({ id: activeDoc?.data?.id });
				}}
				isConfirming={isRemoving}
			/>
		</div>
	);
}
