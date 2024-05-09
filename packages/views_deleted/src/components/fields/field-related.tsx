import * as React from "react";
import { InputFieldProps, useDocument } from "@melony/core";
import { Badge } from "@melony/ui";

export const FieldRelated = ({ field }: { field: InputFieldProps }) => {
	const { data } = useDocument();

	const value = data?.[field.key] || [];

	return (
		<div className="flex items-center gap-1">
			{value.map((item: any) => (
				<Badge key={item._id} variant="outline">
					{item?.title}
				</Badge>
			))}
		</div>
	);
};
