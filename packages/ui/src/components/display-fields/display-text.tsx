import { DisplayFieldProps } from "./types";

export const DisplayText = ({ defaultValue }: DisplayFieldProps) => {
	return <span className="block truncate">{defaultValue}</span>;
};
