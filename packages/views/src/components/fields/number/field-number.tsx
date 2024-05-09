import { InputFieldProps } from "@melony/core";

export const FieldNumber = ({
	field,
	defaultValue,
}: {
	field: InputFieldProps;
	defaultValue: any;
}) => {
	return <span className="block">{defaultValue || "-"}</span>;
};
