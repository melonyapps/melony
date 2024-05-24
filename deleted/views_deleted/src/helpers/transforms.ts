import { Field } from "@melony/core";
import { FilterOperator } from "@melony/core";
import { FilterTokenProps } from "../components/advanced-filter";

export const convertFieldsToFilterTokens = (fields: Field[]) => {
	const filterTokens: FilterTokenProps[] = [];

	fields.map((field) => {
		if (
			["TEXT", "NUMBER", "DATE", "MEMBER", "DOCUMENT", "CHECKBOX"].includes(
				field?.type || "",
			)
		) {
			filterTokens.push({
				defaultOperator: FilterOperator["Contains"],
				availableOperators: [
					FilterOperator["Is"],
					FilterOperator["Contains"],
					FilterOperator["DoesNotContain"],
					FilterOperator["IsAnyOf"],
				],
				// TODO: how to define Field type to have it in core and ui packages
				field,
			});
		}
	});

	// filter by type only fields can be used in Filter UI
	return filterTokens;
};
