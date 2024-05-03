import { InputFieldProps } from "../config";

export function number(params: InputFieldProps): InputFieldProps {
	return {
		...params,
		type: "NUMBER",
	};
}
