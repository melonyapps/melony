import { Field } from "@melony/core";
import { FIELDS_MAP } from "./fields/fields-map";

export function DocumentDetails({
	fields,
	data,
}: {
	fields: Field[];
	data: any;
}): JSX.Element {
	return (
		<div className="flex flex-col py-2 px-0">
			{fields.map((field) => {
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
