export type Model = {
	name: string;
	displayField?: string;
	fields: Field[];
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
	documentation?: string | undefined;
	relationFromFields?: string[];

	// Melony specific.
	relationModel?: string;
	component?: "Document" | "Image" | "Color";
	isDisplayField?: boolean;
};

export type Action = {
	name: string;
	handle: (props: { docs: any; fields: any }) => Promise<any>;
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

export type FilterItem = {
	field: string;
	operator: "Is" | "Contains" | "DoesNotContain" | "IsAnyOf" | "GeoWithinBox";
	value: any;
};
