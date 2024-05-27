import { Model } from "@melony/types";
import { Prisma } from "@prisma/client";

export const getModels = (): Model[] => {
	// console.log(
	// 	Prisma.dmmf.datamodel.models.map((model) => console.log(model.fields)),
	// );
	return Prisma.dmmf.datamodel.models.map((model) => {
		return {
			name: model.name,
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
