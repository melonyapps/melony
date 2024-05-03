import { InputFieldProps } from "@melony/core/config";
import { FormControl } from "@melony/ui/form";
import { Input } from "@melony/ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function FormNumber({
	field,
}: {
	field: ControllerRenderProps<FieldValues, string>;
} & InputFieldProps) {
	return (
		<FormControl>
			<Input
				type="number"
				placeholder={""}
				value={field.value}
				onChange={(e) => {
					field.onChange(e.target.valueAsNumber);
				}}
			/>
		</FormControl>
	);
}
