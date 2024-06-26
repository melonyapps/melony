import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Field, Model } from "@melony/types";
import { getFieldValidation } from "@/lib/validation";
import z from "zod";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { makeFormFields, removeRelationsFromFormValues } from "./helpers";
import { FormInput } from "../form/form-input";
import { FormCombobox } from "../form/form-combobox";
import { FormImage } from "../form/form-image";
import { FormColor } from "../form/form-color";
import { FormSelect } from "../form/form-select";
import { FormNumber } from "../form/form-number";

const FORM_FIELDS_MAP = {
	String: FormInput,
	Number: FormNumber,
	Select: FormSelect,

	// Melony specific "component"
	Document: FormCombobox,
	Documents: FormCombobox, // its not used here yet. we have separated tables for related many docs. here its just for to avoid TS errors.
	Image: FormImage,
	Color: FormColor,
};

export function SmartForm({
	model,
	values,
	onSubmit,
	isSubmitting,
}: {
	model: Model;
	onSubmit: (data: any) => void;
	values?: any;
	isSubmitting?: boolean;
}) {
	const schemaFields = model.fields.map((field) => {
		return [field.name, getFieldValidation(field)];
	});

	const formSchema = z.object(Object.fromEntries(schemaFields));

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: removeRelationsFromFormValues({ values, model }),
	});

	const handleSubmit = (inputData: any) => {
		onSubmit(inputData);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit, (err) => console.log(err))}
				className="space-y-4"
			>
				<FormFields fields={makeFormFields(model)} />

				<div className="flex gap-2 justify-end">
					<Button variant="ghost">Cancel</Button>

					<Button type="submit" disabled={isSubmitting}>
						<Check className="h-4 w-4 mr-2" />
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}

export function FormFields({ fields }: { fields: Field[] }) {
	const { control } = useFormContext();

	return (
		<div className="flex flex-col">
			{fields.map((field) => {
				let Comp = FORM_FIELDS_MAP["String"];

				if (field.type === "Float") {
					Comp = FORM_FIELDS_MAP["Number"];
				}

				if (field?.component) {
					Comp = FORM_FIELDS_MAP[field.component];
				}

				if (field.kind === "enum") {
					Comp = FORM_FIELDS_MAP["Select"];
				}

				return (
					<FormField
						key={field.name}
						control={control}
						name={field.name}
						render={({ field: formFieldProps }) => {
							return (
								<FormItem>
									<div className="grid grid-cols-12 gap-2">
										<div className="col-span-3 py-2.5">
											<FormLabel>{field.name}</FormLabel>
										</div>
										<div className="col-span-9 py-1.5">
											<Comp formFieldProps={formFieldProps} field={field} />

											<FormMessage />
										</div>
									</div>
								</FormItem>
							);
						}}
					/>
				);
			})}
		</div>
	);
}
