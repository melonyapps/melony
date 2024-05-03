import * as React from "react";
import { InputFieldProps } from "@melony/core/config";

export const FieldColor = ({
	field,
	defaultValue,
}: {
	field: InputFieldProps;
	defaultValue: any;
}) => {
	return (
		<div
			className="rounded-full bg-neutral/20 dark:bg-white/20 h-6 w-6 cursor-pointer"
			style={{ backgroundColor: defaultValue }}
		/>
	);
};
