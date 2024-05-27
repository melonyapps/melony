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
	// collect all the relation scalar fields array
	const flattenRelationFromFields = [
		...fields
			.filter((x) => !!x?.relationFromFields)
			.map((y) => y.relationFromFields),
	].flat();

	// filter out scalar relation fields as we already have a @relation field presented
	const result = fields.reduce<Field[]>((prev, curr) => {
		if (!flattenRelationFromFields.includes(curr.name)) {
			let shouldBeDocumentField = false;
			if (curr.kind === "object" && !curr.isList) shouldBeDocumentField = true;

			prev.push({
				...curr,
				component: shouldBeDocumentField ? "Document" : curr?.component,
			});
		}

		return prev;
	}, []);

	console.log(result);

	return result;
};
