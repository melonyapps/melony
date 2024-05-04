import { Adapter } from "./types";
import * as icons from "lucide-react";

// config
export type NavigationItemProps = {
	to: string;
	title?: string;
	icon?: keyof typeof icons;
};

type UI = {
	title?: string;
	logo?: any;
	navigation?: Record<string, NavigationItemProps[]>;
};

export type InputFieldProps = {
	slug: string;
	label?: string;
	type?: string;
	isRequired?: boolean;
	symbol?: string;
};

export type DateFieldProps = {
	slug: string;
	label?: string;
	type?: string;
	isRequired?: boolean;
	hasTime?: boolean;
};

export type DocumentFieldProps = {
	slug: string;
	label?: string;
	type?: string;
	validation?: any;
	collectionSlug: string;
	creatable?: string;
	isRequired?: boolean;
	defaultViewSlug?: string;
	foreignField?: string;
};

export type Field = InputFieldProps | DocumentFieldProps;

export type Collection = {
	slug: string;
	label?: string;
	schema: Field[];
	views?: View[];
	title?: string; // defaults to title
	color?: string; // defaults to color
	image?: string; // defaults to image
};

export type View = {
	slug: string;
	label?: string;
	type?: string;
	icon?: keyof typeof icons;
};

export type DbTrigger = {
	slug: string;
	collectionSlug: string;
	label?: string;
	on?: string[];
	func: any;
};

export type Trigger = DbTrigger;

export type Config = {
	id: string;
	ui?: UI;
	adapter: ({
		id,
		collections,
	}: {
		id: string;
		collections: Collection[];
	}) => Adapter & { auth: any };
	collections: Collection[];
	triggers: Trigger[];
};

export function config(config: Config) {
	return config;
}

export function collection(collection: Collection) {
	return collection;
}

export * as fields from "./fields";
export * as views from "./views";
export * as triggers from "./triggers";
