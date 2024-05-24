import { InputFieldProps } from "../config";

export function checkbox(params: InputFieldProps): InputFieldProps {
	return {
		...params,
		type: "CHECKBOX",
	};
}
