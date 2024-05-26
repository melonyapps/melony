import { Field } from "@melony/types";

export const makeFormFields = (fields: Field[]) => {
	const result: Field[] = [];

	const scalarFields = fields.filter((x) => x.kind === "scalar");
	const objectFields = fields.filter((x) => x.kind === "object");

	// loop scalar fields and make relation with object fields
	scalarFields.map((field) => {
		const relationField = objectFields.find((x) =>
			x.relationFromFields?.includes(field.name),
		);

		if (relationField) {
			result.push({
				...field,
				relationModel: relationField.type,
				component: "Document",
			});
		} else {
			result.push(field);
		}
	});

	return result;
};

export const makeTableFields = (fields: Field[]) => {
	const result: Field[] = [];

	const scalarFields = fields.filter((x) => x.kind === "scalar");
	const objectFields = fields.filter((x) => x.kind === "object");

	// loop scalar fields and make relation with object fields
	scalarFields.map((field) => {
		const relationField = objectFields.find((x) =>
			x.relationFromFields?.includes(field.name),
		);

		if (relationField) {
			result.push({
				...field,
				relationModel: relationField.type,
				component: "Document",
			});
		} else {
			result.push(field);
		}
	});

	return result;
};
