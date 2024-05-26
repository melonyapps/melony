"use client";

import { Combobox, SelectOption } from "../ui/combobox";
import { useList } from "@/hooks";
import { FormFieldProps } from "./types";
import { useApp } from "../providers/app-provider";

export function FormCombobox({ field, formFieldProps }: FormFieldProps) {
	const { models } = useApp();

	const { data = [], isLoading } = useList({
		modelName: field?.relationModel || "unknown",
	});

	if (isLoading) return <>Loading...</>;

	const relatedModel = models?.find((x) => x.name === field?.relationModel);
	const relatedModelDisplayField = relatedModel?.fields?.find(
		(x) => x.isDisplayField,
	);

	const options: SelectOption[] = data.map((item: any) => ({
		value: item.id,
		label:
			item?.[relatedModelDisplayField?.name || "fieldNotFound"] ||
			item?.title ||
			item.id,
	}));

	return (
		<Combobox
			options={options}
			value={formFieldProps.value}
			onChange={(val) => formFieldProps.onChange(val)}
		/>
	);
}
