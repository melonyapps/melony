import { Field } from "@melony/core";
import { z } from "zod";

export const getValidation = (field?: Field) => {
	if (!field) return z.string();

	switch (field.type) {
		case "TEXT":
			if (field.isRequired) return z.string().min(1);
			return z.string().optional();
		case "DOCUMENT":
			if (field.isRequired) return z.string().min(1);
			return z.string().optional();
		case "NUMBER":
			if (field.isRequired) return z.number().min(1);
			return z.number().optional();
		case "CURRENCY":
			if (field.isRequired) return z.number().min(1);
			return z.number().optional();
		case "CHECKBOX":
			if (field.isRequired) return z.boolean();
			return z.boolean().optional();
		case "DATE":
			if (field.isRequired) return z.string();
			return z.string().optional();
		case "IMAGE":
			if (field.isRequired) return z.string();
			return z.string().optional().nullish();

		default:
			return z.string();
	}
};
