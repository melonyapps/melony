import React from "react";
import { InputFieldProps } from "@melony/core/config";
import { FormControl } from "@melony/ui/form";
import { ColorPicker } from "@melony/ui/color-picker";
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
