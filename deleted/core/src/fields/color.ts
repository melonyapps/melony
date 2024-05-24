import { InputFieldProps } from "../config";

export function color(params: InputFieldProps): InputFieldProps {
	return {
		...params,
		type: "COLOR",
	};
}
