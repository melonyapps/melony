"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCollection, useDocument } from "@melony/core";
import { Form } from "@melony/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@melony/ui";
import { Check } from "lucide-react";
import { Card } from "@melony/ui";
import { useNavigate } from "react-router-dom";
import { getValidation } from "../lib/validate";
import { FormFields } from "./fields/form-fields";
import { filterEditableFields } from "../lib/filter-editable-fields";

export function DocumentForm() {
	const navigate = useNavigate();
	const {
		slug,
		view,
		schema,
		createDoc,
		updateDoc,
		isUpdatingDoc,
		isCreatingDoc,
	} = useCollection();
	const { data: docData, isLoading } = useDocument();

	const filteredSchema = filterEditableFields(schema);

	const schemaFields = filteredSchema.map((field) => {
		return [field.slug, getValidation(field)];
	});

	const formSchema = z.object(Object.fromEntries(schemaFields));

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: docData,
	});

	const handleSubmit = (inputData: any) => {
		if (docData?._id) {
			updateDoc(
				{ id: docData?._id, data: inputData },
				{
					onSuccess: () => {
						navigate(`/${slug}`);
					},
				},
			);
		} else {
			createDoc(inputData, {
				onSuccess: () => {
					// onSuccess();
					navigate(`/${slug}`);
				},
			});
		}
	};

	if (isLoading) return <>Loading...</>;

	return (
		<Card className="flex-1 flex flex-col overflow-hidden py-4 px-2">
			<div className="grid grid-cols-12">
				<div className="col-span-8">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit, (err) =>
								console.log(err),
							)}
							className="space-y-4"
						>
							<FormFields schema={filteredSchema} />

							<div className="flex justify-end p-4">
								<Button type="submit" disabled={isCreatingDoc || isUpdatingDoc}>
									<Check className="h-4 w-4 mr-2" />
									Submit
								</Button>
							</div>
						</form>
					</Form>
				</div>
				<div className="col-span-8"></div>
			</div>
		</Card>
	);
}
