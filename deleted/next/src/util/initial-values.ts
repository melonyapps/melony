import { PrismaField } from "../types";

export function getInitialValuesFromPrismaFields(fields: PrismaField[]) {
	const initialValues: Record<string, unknown> = {};
	for (const fieldName in fields) {
		const fieldData = fields[fieldName] || { type: "String" };
		if ("default" in fieldData) {
			initialValues[fieldName] = fieldData.default;
		} else {
			// Set a default value based on the field type (if possible)
			const fieldType = fieldData.type;
			switch (fieldType) {
				case "Int":
					initialValues[fieldName] = 0;
					break;
				case "String":
					initialValues[fieldName] = "";
					break;
				case "Boolean":
					initialValues[fieldName] = false;
					break;
				// Handle other field types as needed
			}
		}
	}
	return initialValues;
}
