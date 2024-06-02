import { FilterItem, Model } from "@melony/types";
import { Prisma } from "@prisma/client";

export const getModels = (): Model[] => {
	const enums = Prisma.dmmf.datamodel.enums;

	// console.log(Prisma.dmmf.datamodel.models.map((model) => console.log(model)));

	return Prisma.dmmf.datamodel.models.map((model) => {
		const modelOptions = parseStringOptions(model?.documentation);

		return {
			name: model.name,
			layout: modelOptions?.layout as any,
			fields: model.fields.map((field) => {
				const options = parseStringOptions(field?.documentation);

				return {
					kind: field.kind,
					name: field.name,
					isRequired: field.isRequired,
					isList: field.isList,
					isUnique: field.isUnique,
					isId: field.isId,
					isReadOnly: field.isReadOnly,
					type: field.type,
					documentation: field?.documentation,
					relationFromFields: field?.relationFromFields
						? [...field?.relationFromFields]
						: undefined,

					// melony specific
					isDisplayField: options?.displayField as boolean,
					component: options?.component as Model["fields"][0]["component"],
					options:
						field.kind === "enum"
							? enums
									.find((x) => x.name === field.type)
									?.values?.map((value) => ({
										label: value.name,
										value: value.name,
									}))
							: undefined,
				};
			}),
		};
	});
};

export const getModel = (modelName: string): Model | undefined => {
	const prismaModel = getModels().find((x) => x.name === modelName);

	return prismaModel;
};

type ParsedOptions = { [key: string]: string | boolean };

export function parseStringOptions(str?: string): ParsedOptions {
	const options: ParsedOptions = {};
	if (!str) return options;

	for (const option of str.split(/\s+/)) {
		const [key, value] = option.split("=");

		// Handle case with no value (key is treated as a truthy value)
		options[key as string] = value === undefined ? true : value;
	}

	return options;
}

export function convertFilterToPrisma(
	filters: FilterItem[],
): Record<string, any> {
	const whereClause: Record<string, any> = {};
	for (const filterItem of filters) {
		const { field, operator, value } = filterItem;

		if (value !== "") {
			switch (operator) {
				case "Contains":
					whereClause[field] = { contains: value };
					break;
				case "Is":
					whereClause[field] = value;
					break;
				default:
					throw new Error(`Unsupported operator: ${operator}`);
			}
		}
	}
	return whereClause;
}
