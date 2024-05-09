import * as React from "react";
import { InputFieldProps } from "@melony/core";
import { formatNumber } from "../../../lib/format-numbers";

export const FieldCurrency = ({
	field,
	defaultValue,
}: {
	field: InputFieldProps;
	defaultValue: any;
}) => {
	return (
		<span className="block truncate">
			{field?.symbol}
			{defaultValue ? formatNumber(defaultValue) : "-"}
		</span>
	);
};
