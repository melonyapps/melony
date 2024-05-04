"use client";

import { useCollection } from "@melony/core/react";
import { DataTable } from "@melony/ui/data-table";
import { FIELDS } from "../constants";
import { filterEditableFields } from "../helpers/filter-editable-fields";
import { useMelonyNavigate } from "../hooks/use-melony-navigate";

export function Table() {
	const navigate = useMelonyNavigate();
	const { slug, view, isLoading, schema, result } = useCollection();

	const filteredSchema = filterEditableFields(schema);

	return (
		<DataTable<{ _id: string }, any>
			isLoading={isLoading}
			columns={filteredSchema.map((field) => {
				const Comp =
					FIELDS[field?.type || "TEXT"]?.["default"] || (() => <></>);

				const textAlignClass = ["CURRENCY", "NUMBER"].includes(
					field?.type || "",
				)
					? "text-right"
					: "text-left";

				const columnId =
					field.type === "DOCUMENT" ? `${field.slug}_full` : field.slug;

				return {
					accessorKey: columnId,
					header: () => (
						<div className={textAlignClass}>{field?.label || field.slug}</div>
					),
					cell: ({ row }) => {
						return (
							<div className={textAlignClass}>
								<Comp field={field} defaultValue={row.getValue(columnId)} />
							</div>
						);
					},
				};
			})}
			data={result.docs}
			onClickRow={(doc) => {
				navigate(`/c/${slug}/v/${view?.slug || "base"}/d/${doc._id}`);
			}}
		/>
	);
}
