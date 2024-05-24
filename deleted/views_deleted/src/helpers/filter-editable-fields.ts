import { Field } from "@melony/core";

export const filterEditableFields = (schema: Field[]) => {
	return schema.filter(
		(x) =>
			!["DOCUMENTS"].includes(x.type || "") &&
			!["createdAt", "updatedAt"].includes(x.slug),
	);
};
