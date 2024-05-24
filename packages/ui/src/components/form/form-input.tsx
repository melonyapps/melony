import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

export function FormInput({
	formField,
}: {
	formField: ControllerRenderProps<FieldValues, string>;
}) {
	return (
		<FormControl>
			<Input placeholder={""} {...formField} />
		</FormControl>
	);
}
