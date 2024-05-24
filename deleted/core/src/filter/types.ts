export enum FilterOperator {
	Is = "is",
	Contains = "contains",
	DoesNotContain = "does not contain",
	IsAnyOf = "is any of",
	GeoWithinBox = "geo within box",
}

export type FilterItem = {
	field: string;
	operator: "Is" | "Contains" | "DoesNotContain" | "IsAnyOf" | "GeoWithinBox";
	value: any;
};
