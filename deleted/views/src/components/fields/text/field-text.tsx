import * as React from "react";
import { InputFieldProps } from "@melony/core";

export const FieldText = ({
	field,
	defaultValue,
}: {
	field: InputFieldProps;
	defaultValue: any;
}) => {
	return <span className="block truncate">{defaultValue || "-"}</span>;
};
