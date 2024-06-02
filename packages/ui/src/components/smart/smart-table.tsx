import React from "react";
import { Field, FilterItem, Model } from "@melony/types";

import { DataTable } from "../data-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useList } from "@/hooks";
import { PlusIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { useApp } from "../providers/app-provider";
import { makeTableFields } from "./helpers";
import { AdvancedFilter } from "../advanced-filter";
import { DisplayText } from "../display-fields/display-text";
import { DisplayImage } from "../display-fields/display-image";
import { DisplayDocument } from "../display-fields/display-document";
import { DisplayDocuments } from "../display-fields/display-documents";
import { DisplayColor } from "../display-fields/display-color";
import { Actions } from "./actions";
import { ViewDocDialog } from "./view-doc-dialog";
import { DocMenu } from "./doc-menu";
import { CreateDocDialog } from "./create-doc-dialog";

const DISPLAY_FIELDS_MAP = {
	String: DisplayText,

	// Melony specific "component"
	Document: DisplayDocument,
	Documents: DisplayDocuments,
	Image: DisplayImage,
	Color: DisplayColor,
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
				onClick={(e) => {
					e.stopPropagation();
				}}
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
		mode: "update" | "create";
		data?: any;
	} | null>(null);

	const [rowSelection, setRowSelection] = React.useState({});

	const [filter, setFilter] = React.useState<FilterItem[]>(initialFilter || []);

	const { getModelActions } = useApp();

	const { data = [], isLoading } = useList({
		model,
		filter,
	});

	const modelActions = getModelActions(model.name);

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
				<div className="flex items-center gap-2">
					{modelActions.length > 0 && (
						<Actions
							model={model}
							actions={modelActions}
							docs={data.filter((_: any, index: number) =>
								Object.keys(rowSelection).includes(`${index}`),
							)}
						/>
					)}

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
					onSelect={setRowSelection}
				/>
			</div>

			<CreateDocDialog
				model={model}
				open={activeDoc?.mode === "create"}
				onClose={() => {
					setActiveDoc(null);
				}}
			/>

			<ViewDocDialog
				model={model}
				data={activeDoc?.data}
				open={activeDoc?.mode === "update"}
				onClose={() => {
					setActiveDoc(null);
				}}
			/>
		</div>
	);
}
