import { InputFieldProps } from "@melony/core";
import { FormControl } from "@melony/ui";
import { Input } from "@melony/ui";
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
