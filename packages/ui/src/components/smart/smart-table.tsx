import React from "react";
import { Field, Model } from "@melony/types";

import { DataTable } from "../data-table";
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
import { Ellipsis, X } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ConfirmDialog } from "../confirm-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { useApp } from "../providers/app-provider";
import { makeTableFields } from "./helpers";
import { DisplayText } from "../display-fields/display-text";
import { DisplayImage } from "../display-fields/display-image";
import { DisplayDocument } from "../display-fields/display-document";

const DISPLAY_FIELDS_MAP = {
	String: DisplayText,

	// Melony specific "component"
	Document: DisplayDocument,
	Image: DisplayImage,
	Color: DisplayText,
};

const generateColumnsFromFields = (fields: Field[]) => {
	const result: ColumnDef<
		{
			[x: string]: {};
		},
		unknown
	>[] = [];

	result.push({
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	});

	fields.map((field) => {
		result.push({
			accessorKey: field.name,
			cell: ({ row }) => {
				const Comp = DISPLAY_FIELDS_MAP[field?.component || "String"];

				return <Comp field={field} defaultValue={row.getValue(field.name)} />;
			},
		});
	});

	return result;
};

export function SmartTable({ model }: { model: Model }) {
	const [activeDoc, setActiveDoc] = React.useState<{
		mode: "show" | "update" | "create" | "delete";
		data?: any;
	} | null>(null);

	const { getModelActions } = useApp();

	const { data = [], isLoading } = useList({
		model,
	});

	const { mutate: create, isPending: isCreating } = useCreate({
		model,
		onSuccess: () => {
			setActiveDoc(null);
		},
	});

	const { mutate: update, isPending: isUpdating } = useUpdate({
		model,
		onSuccess: () => {
			setActiveDoc(null);
		},
	});

	const { mutate: remove, isPending: isRemoving } = useDelete({
		model,
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
					columns={generateColumnsFromFields(makeTableFields(model.fields))}
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
											<Ellipsis className="h-4 w-4" />
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
