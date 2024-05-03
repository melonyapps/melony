import { InputFieldProps } from "@melony/core/config";
import * as React from "react";

export const FieldText = ({
	field,
	defaultValue,
}: {
	field: InputFieldProps;
	defaultValue: any;
}) => {
	return <span className="block truncate">{defaultValue || "-"}</span>;
};
