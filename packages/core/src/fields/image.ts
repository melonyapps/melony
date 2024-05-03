import { InputFieldProps } from "../config";

export function image(params: InputFieldProps): InputFieldProps {
	return {
		...params,
		type: "IMAGE",
	};
}
