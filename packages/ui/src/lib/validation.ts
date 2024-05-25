import { Field } from "@melony/types";
import { z } from "zod";

export function getFieldValidation(field: Field): z.ZodType {
	let zodType: z.ZodType = z.unknown(); // Default to unknown for flexibility

	console.log(field);

	switch (field.type) {
		case "Int":
		case "BigInt":
		case "Float":
			zodType = z.number();
			break;
		case "String":
			zodType = z.string();
			break;
		case "Boolean":
			zodType = z.boolean();
			break;
		case "DateTime":
		case "Json": // Handle Json as a passthrough for flexibility
			zodType = z.string().optional(); // Allow null or string for optional fields
			break;
		case "Decimal":
			zodType = z.string(); // Can be refined based on specific needs
			break;
		default:
			console.warn(`Unsupported Prisma field type: ${field.type}`);
			break;
	}

	// Handle optional fields using `?`
	if (!field.isRequired) {
		zodType = zodType.optional().nullish(); // nullish is needed because that input is null when doc is created with optional fields
	} else if (field.hasOwnProperty("default")) {
		// Handle fields with defaults (optional for flexibility)
		zodType = zodType.default(field.default);
	}

	// ID is always optional because we expect to always autogenerate it.
	if (field.isId) {
		zodType = zodType.optional();
	}

	return zodType;
}
