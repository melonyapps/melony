import { useCollection, useDocument } from "@melony/core";
import { FIELDS_MAP } from "./fields/fields-map";
import { filterEditableFields } from "../lib/filter-editable-fields";

export function DocumentDetails({}: {}): JSX.Element {
	const { data } = useDocument();

	const { schema } = useCollection();

	const filteredSchema = filterEditableFields(schema);

	return (
		<div className="flex flex-col py-2 px-0">
			{filteredSchema.map((field) => {
				const Comp =
					FIELDS_MAP[field?.type || "TEXT"]?.["default"] || (() => <></>);

				const fieldId =
					field.type === "DOCUMENT" ? `${field.slug}_full` : field.slug;

				return (
					<div
						key={field.slug}
						className="grid grid-cols-12 py-2.5 gap-8 text-sm"
					>
						<div className="col-span-4 truncate px-4">
							<div className="text-muted-foreground block truncate">
								{field?.label || field.slug}
							</div>
						</div>
						<div className="col-span-8">
							<Comp field={field} defaultValue={data?.[fieldId]} />
						</div>
					</div>
				);
			})}
		</div>
	);
}
