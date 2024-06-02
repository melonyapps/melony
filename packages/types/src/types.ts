export type Model = {
	name: string;
	fields: Field[];
	layout?: "Table" | "Cards";
};

export type Field = {
	kind: string;
	name: string;
	isRequired: boolean;
	isList: boolean;
	isUnique: boolean;
	isId: boolean;
	isReadOnly: boolean;
	type: string;
	default?: unknown;
	documentation?: string | undefined;
	relationFromFields?: string[];

	// Melony specific.
	relationModel?: string;
	component?: "Document" | "Image" | "Color";
	isDisplayField?: boolean;
	options?: { label: string; value: any }[];
};

export type Action = {
	name: string;
	handle: (props: CustomActionPayload) => Promise<any>;
};

export type MelonyApp = {
	actions?: Record<string, Action[]>;
};

export type User = {
	id: string;
	email: string;
	image?: string;
	name?: string;
};

export type LoginActionPayload = {
	email: string;
	password: string;
};

export type ListActionPayload = {
	model: Model;
	filter?: FilterItem[];
};

export type CreateActionPayload = {
	model: Model;
	data: any;
};

export type UpdateActionPayload = {
	model: Model;
	data: any;
};

export type DeleteActionPayload = {
	model: Model;
	where: any;
};

export type CustomActionPayload = {
	docs: any;
};

export type FilterItem = {
	field: string;
	operator: "Is" | "Contains" | "DoesNotContain" | "IsAnyOf" | "GeoWithinBox";
	value: any;
};
