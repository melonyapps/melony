export type Field = {
	name: string;
	isRequired: boolean;
	isList: boolean;
	isUnique: boolean;
	isId: boolean;
	isReadOnly: boolean;
	type: string;
	documentation?: string | undefined;
};

export type Model = {
	name: string;
	fields: Field[];
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
	modelName: string;
};

export type CreateActionPayload = {
	modelName: string;
	data: any;
};

export type UpdateActionPayload = {
	modelName: string;
	data: any;
};

export type DeleteActionPayload = {
	modelName: string;
	where: any;
};
