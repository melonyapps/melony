export type PrismaField = {
	kind: "scalar" | "object" | "enum" | "unsupported";
	name: string;
	isRequired: boolean;
	isList: boolean;
	isUnique: boolean;
	isId: boolean;
	isReadOnly: boolean;
	isGenerated?: boolean;
	isUpdatedAt?: boolean;
	type: string;
	dbName?: string | null;
	hasDefaultValue: boolean;
	default?: unknown;
	relationToFields?: string[];
	relationOnDelete?: string;
	relationName?: string;
	documentation?: string;
};
