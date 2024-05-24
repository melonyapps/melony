"use client";

import { Field } from "@melony/core";
import { DataTable } from "@melony/ui";
import { FIELDS_MAP } from "./fields/fields-map";

export function Table({
	fields,
	data,
	isLoading,
	onRowClick,
}: {
	fields: Field[];
	data: any;
	isLoading?: boolean;
	onRowClick: (doc: any) => void;
}) {
	return (
		<DataTable<{ _id: string }, any>
			isLoading={isLoading}
			columns={fields.map((field) => {
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
			data={data}
			onClickRow={onRowClick}
		/>
	);
}
