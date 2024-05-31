import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { FormFieldProps } from "./types";

export function FormInput({ field, formFieldProps }: FormFieldProps) {
	return (
		<FormControl>
			<Input placeholder={field.name} {...formFieldProps} />
		</FormControl>
	);
}
