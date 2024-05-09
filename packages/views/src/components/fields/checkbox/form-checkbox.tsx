import React from "react";
import { InputFieldProps } from "@melony/core";
import { FormControl } from "@melony/ui";
import { Checkbox } from "@melony/ui";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function FormCheckbox({
	type,
	field,
}: {
	field: ControllerRenderProps<FieldValues, string>;
} & InputFieldProps) {
	return (
		<FormControl>
			<Checkbox
				checked={Boolean(field.value)}
				disabled={field?.disabled}
				onCheckedChange={field.onChange}
			/>
		</FormControl>
	);
}
