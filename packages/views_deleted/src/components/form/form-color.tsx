import React from "react";
import { InputFieldProps } from "@melony/core";
import { FormControl } from "@melony/ui";
import { ColorPicker } from "@melony/ui";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function FormColor({
	type,
	field,
}: {
	field: ControllerRenderProps<FieldValues, string>;
} & InputFieldProps) {
	return (
		<FormControl>
			<ColorPicker {...field} />
		</FormControl>
	);
}
