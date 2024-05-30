"use client";

import { Combobox, SelectOption } from "../ui/combobox";
import { useList } from "@/hooks";
import { FormFieldProps } from "./types";
import { useApp } from "../providers/app-provider";
import { Avatar, AvatarImage } from "../ui/avatar";

export function FormCombobox({ field, formFieldProps }: FormFieldProps) {
	const { models } = useApp();

	const relatedModel = models?.find((x) => x.name === field?.relationModel);

	const { data = [], isLoading } = useList({
		model: relatedModel || {
			name: "unknown",
			fields: [],
		},
	});

	const relatedModelDisplayField = relatedModel?.fields?.find(
		(x) => x.isDisplayField,
	);

	const relatedModelImageField = relatedModel?.fields?.find(
		(x) => x?.component === "Image",
	);

	const options: SelectOption[] = data.map((item: any) => {
		const Icon = relatedModelImageField ? (
			<Avatar className="w-4 h-4 mr-2">
				<AvatarImage src={item?.[relatedModelImageField.name]} />
			</Avatar>
		) : undefined;

		return {
			value: item.id,
			label:
				item?.[relatedModelDisplayField?.name || "fieldNotFound"] ||
				item?.title ||
				item.id,
			icon: Icon,
		};
	});

	return (
		<Combobox
			options={options}
			value={formFieldProps.value}
			onChange={(val) => formFieldProps.onChange(val)}
			isLoading={isLoading}
		/>
	);
}
