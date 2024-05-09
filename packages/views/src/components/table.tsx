"use client";

import { useCollection } from "@melony/core";
import { DataTable } from "@melony/ui";
import { useNavigate } from "react-router-dom";
import { filterEditableFields } from "../lib/filter-editable-fields";
import { FIELDS_MAP } from "./fields/fields-map";

export function Table() {
	const navigate = useNavigate();
	const { slug, view, isLoading, schema, result } = useCollection();

	const filteredSchema = filterEditableFields(schema);

	return (
		<DataTable<{ _id: string }, any>
			isLoading={isLoading}
			columns={filteredSchema.map((field) => {
				const Comp =
					FIELDS_MAP[field?.type || "TEXT"]?.["default"] || (() => <></>);

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
				navigate(`/${slug}/${doc._id}`);
			}}
		/>
	);
}
