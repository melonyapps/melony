import React from "react";
import { FormControl } from "@melony/ui/form";
import { formatDateToISOLocal } from "@melony/ui/lib";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Input } from "@melony/ui/input";
import { DateFieldProps } from "@melony/core/config";

export function FormDate({
	field,
	hasTime,
}: {
	field: ControllerRenderProps<FieldValues, string>;
} & DateFieldProps) {
	return (
		<FormControl>
			<Input
				placeholder={""}
				{...field}
				value={
					field.value &&
					formatDateToISOLocal(field.value).slice(0, hasTime ? 16 : 10)
				}
				type={hasTime ? "datetime-local" : "date"}
				className="w-auto"
			/>
		</FormControl>
	);
}
