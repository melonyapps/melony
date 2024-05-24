import { Model } from "@melony/types";
import { Prisma } from "@prisma/client";

export const getModels = (): Model[] => {
	return Prisma.dmmf.datamodel.models.map((model) => ({
		name: model.name,
		fields: model.fields.map((field) => ({
			name: field.name,
			isRequired: field.isRequired,
			isList: field.isList,
			isUnique: field.isUnique,
			isId: field.isId,
			isReadOnly: field.isReadOnly,
			type: field.type,
			documentation: field?.documentation,
		})),
	}));
};

export const getModel = (modelName: string): Model => {
	const prismaModel = getModels().find((x) => x.name === modelName);

	return {
		name: prismaModel?.name || "unknown",
		fields:
			prismaModel?.fields.map((field) => ({
				name: field.name,
				isRequired: field.isRequired,
				isList: field.isList,
				isUnique: field.isUnique,
				isId: field.isId,
				isReadOnly: field.isReadOnly,
				type: field.type,
				documentation: field?.documentation,
			})) || [],
	};
};
