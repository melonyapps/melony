import React from "react";
import { Field, FilterItem, Model } from "@melony/types";

import { DataTable } from "../data-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { SmartForm } from "./smart-form";
import { useCreate, useUpdate, useList, useDelete } from "@/hooks";
import { Ellipsis, PlusIcon, X } from "lucide-react";
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
import { AdvancedFilter } from "../advanced-filter";
import { DisplayText } from "../display-fields/display-text";
import { DisplayImage } from "../display-fields/display-image";
import { DisplayDocument } from "../display-fields/display-document";
import { SmartTabbedRelatedLists } from "./smart-tabbed-related-lists";
import { DisplayDocuments } from "../display-fields/display-documents";

const DISPLAY_FIELDS_MAP = {
	String: DisplayText,

	// Melony specific "component"
	Document: DisplayDocument,
	Documents: DisplayDocuments,
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

export function SmartTable({
	model,
	initialFilter,
}: {
	model: Model;
	initialFilter?: FilterItem[];
}) {
	const [activeDoc, setActiveDoc] = React.useState<{
		mode: "show" | "update" | "create" | "delete";
		data?: any;
	} | null>(null);

	const [filter, setFilter] = React.useState<FilterItem[]>(initialFilter || []);

	const { getModelActions } = useApp();

	const { data = [], isLoading } = useList({
		model,
		filter,
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
			<div className="flex justify-between items-center py-4">
				<div className="flex items-center gap-2">
					<Input placeholder="Search..." />
					<AdvancedFilter
						model={model}
						values={filter}
						onChange={(filter) => {
							console.log("filterChange", filter);
							setFilter(filter);
						}}
					/>
				</div>
				<div>
					<Button
						variant="outline"
						onClick={() => {
							setActiveDoc({ mode: "create" });
						}}
					>
						<PlusIcon className="w-4 h-4 mr-2" />
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

			<Dialog
				open={activeDoc?.mode === "update"}
				onOpenChange={(open) => !open && setActiveDoc(null)}
			>
				<DialogContent className="max-w-[60rem]">
					<DialogHeader>
						<div className="flex justify-between items-center">
							<DialogTitle>Update</DialogTitle>
							<div className="flex gap-1 items-center">
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

					<DialogBody>
						<div className="flex flex-col gap-4">
							<SmartForm
								model={model}
								values={activeDoc?.data}
								onSubmit={update}
								isSubmitting={isUpdating}
							/>

							<SmartTabbedRelatedLists
								model={model}
								doc={activeDoc?.data || {}}
							/>
						</div>
					</DialogBody>
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
