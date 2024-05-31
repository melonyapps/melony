import { Field, Model } from "@melony/types";

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
		// omit related scalar and ID fields from table
		if (!flattenRelationFromFields.includes(curr.name) && !curr.isId) {
			let overrideComponent: Field["component"] = undefined;
			if (curr.kind === "object" && !curr.isList)
				overrideComponent = "Document";
			if (curr.kind === "object" && curr.isList) {
				overrideComponent = "Documents";
			}

			prev.push({
				...curr,
				component: overrideComponent || curr?.component,
			});
		}

		return prev;
	}, []);

	return result;
};

export const getRelatedListFields = ({ model }: { model: Model }) => {
	return model.fields.filter((x) => x.kind === "object" && x.isList);
};

export const removeRelationsFromFormValues = ({
	values,
	model,
}: {
	values: any;
	model: Model;
}) => {
	const result: any = {};

	model.fields.map((field) => {
		if (field.kind !== "object") {
			result[field.name] = values?.[field.name];
		}
	});

	return result;
};
