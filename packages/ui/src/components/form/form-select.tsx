import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { FormFieldProps } from "./types";

export function FormSelect({ field, formFieldProps }: FormFieldProps) {
	return (
		<FormControl>
			<Select onValueChange={formFieldProps.onChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select" />
				</SelectTrigger>
				<SelectContent>
					{field?.options?.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</FormControl>
	);
}
