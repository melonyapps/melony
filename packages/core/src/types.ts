import { Config } from "./config";
import { CollectionParams } from ".";

export type AuthProviderProps = {
	login: (props?: { onSuccess: (user: any) => void }) => Promise<any>;
	logout: (props?: { onSuccess: () => void }) => Promise<any>;
	session: (props?: { onSuccess: () => void }) => Promise<any>;
};

export type DataProviderProps = {
	createDocument: (collectionSlug: string, data: any) => Promise<any>;
	deleteDocument: (
		collectionSlug: string,
		id: string,
		projectId: string,
	) => Promise<any>;
	getDocument: (
		projectId: string,
		collectionSlug: string,
		id: string,
		params?: any,
	) => Promise<any>;
	getDocuments: (
		projectId: string,
		collectionSlug: string,
		params?: any,
	) => Promise<any>;
	updateDocument: (
		collectionSlug: string,
		id: string,
		data: any,
	) => Promise<any>;
	getSuggestions: (projectId: string, params?: any) => Promise<any>;
	upload: (data: FormData, projectId: string) => Promise<any>;
};

export type ConfigProvideProps = {
	config: Config;
};

export type AdapterProps = {
	getSuggestions: ({
		collectionSlug,
	}: {
		collectionSlug: string;
	}) => Promise<{ docs: unknown[]; meta: { total: number } }>;
	getDocument: (params: {
		collectionSlug: string;
		docId: string;
	}) => Promise<{ data: unknown; meta: {} }>;
	getDocuments: (
		params: {
			collectionSlug: string;
		} & CollectionParams,
	) => Promise<{ docs: unknown[]; meta: { total: number } }>;
	createDocument: (params: {
		collectionSlug: string;
		data: any;
		auth: { user: { email: string } } | any;
	}) => Promise<any>;
	updateDocument: (params: {
		collectionSlug: string;
		docId: string;
		data: any;
	}) => Promise<any>;
	deleteDocument: (params: {
		collectionSlug: string;
		docId: string;
	}) => Promise<any>;
};
