import React from "react";
import { InputFieldProps } from "@melony/core";
import { FormControl } from "@melony/ui";
import { Input } from "@melony/ui";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function FormInput({
	type,
	field,
}: {
	field: ControllerRenderProps<FieldValues, string>;
} & InputFieldProps) {
	return (
		<FormControl>
			<Input placeholder={""} {...field} type={type} />
		</FormControl>
	);
}
