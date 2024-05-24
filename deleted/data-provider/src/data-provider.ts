import { DataProviderProps } from "@melony/core";
import { createDocument } from "./create-document";
import { deleteDocument } from "./delete-document";
import { getDocument } from "./get-document";
import { getDocuments } from "./get-documents";
import { getSuggestions } from "./get-suggestions";
import { updateDocument } from "./update-document";
import { upload } from "./upload";

export const dataProvider = ({
	apiUrl,
}: {
	apiUrl: string;
}): DataProviderProps => {
	return {
		getDocument: (projectId, collectionSlug, id, params) =>
			getDocument(apiUrl, projectId, collectionSlug, id, params),
		getDocuments: (projectId, collectionSlug, params) =>
			getDocuments(apiUrl, projectId, collectionSlug, params),
		createDocument: (collectionSlug, data) =>
			createDocument(apiUrl, collectionSlug, data),
		updateDocument: (collectionSlug, id, data) =>
			updateDocument(apiUrl, collectionSlug, id, data),
		deleteDocument: (collectionSlug, id, projectId) =>
			deleteDocument(apiUrl, collectionSlug, id, projectId),
		getSuggestions: (projectId, params) =>
			getSuggestions(apiUrl, projectId, params),

		upload: (data, projectId) => upload(apiUrl, data, projectId),
	};
};
