import * as React from "react";
import { Check } from "lucide-react";
import { InputFieldProps } from "@melony/core/config";

export const FieldCheckbox = ({
	field,
	defaultValue,
}: {
	field: InputFieldProps;
	defaultValue: any;
}) => {
	return defaultValue ? (
		<Check className="h-5 w-5 text-success" />
	) : (
		<Check className="h-5 w-5 opacity-10" />
	);
};
