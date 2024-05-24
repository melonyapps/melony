import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Field, Model } from "@melony/types";
import { getFieldValidation } from "@/lib/validation";
import z from "zod";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { FormInput } from "../form/form-input";

const FIELDS_MAP = {
	String: FormInput,
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
		values,
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
				<FormFields fields={model.fields} />

				<div className="flex justify-end">
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
				const Comp = FIELDS_MAP["String"];

				return (
					<FormField
						key={field.name}
						control={control}
						name={field.name}
						render={({ field: formField }) => {
							return (
								<FormItem>
									<div className="grid grid-cols-12 gap-2">
										<div className="col-span-3 py-2.5">
											<FormLabel>{field.name}</FormLabel>
										</div>
										<div className="col-span-9 py-1.5">
											<Comp formField={formField} />
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
