"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@melony/core";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Form,
} from "@melony/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@melony/ui";
import { Check } from "lucide-react";
import { getValidation } from "../lib/validate";
import { FormFields } from "./fields/form-fields";

export function DocumentFormForModal({
	fields,
	data,
	isLoading,
	isSubmitting,
	onSubmit,
}: {
	fields: Field[];
	data: any;
	isLoading?: boolean;
	isSubmitting?: boolean;
	onSubmit: (data: any) => void;
}) {
	const schemaFields = fields.map((field) => {
		return [field.slug, getValidation(field)];
	});

	const formSchema = z.object(Object.fromEntries(schemaFields));

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: data,
	});

	const handleSubmit = (inputData: any) => {
		onSubmit(inputData);
	};

	if (isLoading) return <>Loading...</>;

	return (
		<DialogContent className="max-w-[44rem]">
			<DialogHeader>
				<DialogTitle>Doc</DialogTitle>
				{/* <DialogDescription>
							Make changes to your profile here. Click save when you're done.
						</DialogDescription> */}
			</DialogHeader>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit, (err) => console.log(err))}
				>
					<FormFields schema={fields} />

					<DialogFooter className="mt-2">
						<Button type="submit" disabled={isSubmitting}>
							<Check className="h-4 w-4 mr-2" />
							Submit
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}
