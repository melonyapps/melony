import * as React from "react";
import { useCollection } from "@melony/core";
import { FIELDS } from "../constants";
import { Card } from "@melony/ui";
import { useMelonyNavigate } from "../hooks/use-melony-navigate";
import { filterEditableFields } from "../helpers/filter-editable-fields";

export function Cards() {
	const navigate = useMelonyNavigate();

	const { slug, schema, result, view } = useCollection();

	const filteredSchema = filterEditableFields(schema);

	return (
		<div className="grid sm:grid-cols-4 2xl:grid-cols-6 gap-4">
			{result.docs.map((doc) => (
				<Card
					key={doc._id}
					className="cursor-pointer"
					onClick={() => {
						navigate(`/c/${slug}/v/${view?.slug || "base"}/d/${doc._id}`);
					}}
				>
					<div className="py-3 px-4 flex flex-col gap-3">
						{filteredSchema.map((field) => {
							const Comp =
								FIELDS[field?.type || "TEXT"]?.["default"] || (() => <></>);

							const fieldId =
								field.type === "DOCUMENT" ? `${field.slug}_full` : field.slug;

							return (
								<div key={field.slug} className="flex flex-col gap-1">
									<p className="text-sm text-muted-foreground block truncate">
										{field?.label || field.slug}
									</p>
									<p className="font-medium leading-none block truncate">
										<Comp field={field} defaultValue={doc?.[fieldId]} />
									</p>
								</div>
							);
						})}
					</div>
				</Card>
			))}
		</div>
	);
}
