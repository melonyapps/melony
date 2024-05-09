import * as React from "react";
import { formatNumber } from "../../helpers/format";
import { InputFieldProps } from "@melony/core";

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
