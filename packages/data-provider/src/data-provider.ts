import { createDocument } from "./create-document";
import { deleteDocument } from "./delete-document";
import { getDocument } from "./get-document";
import { getDocuments } from "./get-documents";
import { getSuggestions } from "./get-suggestions";
import { updateDocument } from "./update-document";
import { upload } from "./upload";
// import { getCollection } from "./get-collection";
// import { getCollections } from "./get-collections";
// import { createCollection } from "./create-collection";
// import { updateCollection } from "./update-collection";
// import { deleteCollection } from "./delete-collection";

// import { signIn } from "./sign-in";

// import { addField } from "./add-field";

// import { createMember } from "./create-member";
// import { deleteMember } from "./delete-member";
// import { getMembers } from "./get-members";

// import { getProject } from "./get-project";
// import { getProjects } from "./get-projects";

// import { createView } from "./create-view";
// import { deleteView } from "./delete-view";
// import { getView } from "./get-view";
// import { getViews } from "./get-views";
// import { updateView } from "./update-view";
import { DataProvider } from "@melony/core/types";
import { init } from "./init";

export const dataProvider = ({ apiUrl }: { apiUrl: string }): DataProvider => {
	return {
		// signIn: () => signIn(apiUrl),

		// createMember: (data) => createMember(apiUrl, data),
		// deleteMember: (id, params) => deleteMember(apiUrl, id, params),
		// getMembers: (params) => getMembers(apiUrl, params),

		// getProject: (id) => getProject(apiUrl, id),
		// getProjects: () => getProjects(apiUrl),

		// createView: (data) => createView(apiUrl, data),
		// deleteView: (id, projectId) => deleteView(apiUrl, id, projectId),
		// getView: (id, projectId, params) => getView(apiUrl, id, projectId, params),
		// getViews: (params) => getViews(apiUrl, params),
		// updateView: (id, data) => updateView(apiUrl, id, data),

		// addField: (collectionSlug, data) => addField(apiUrl, collectionSlug, data),
		// getCollection: (slug, projectId) => getCollection(apiUrl, slug, projectId),
		// getCollections: (params) => getCollections(apiUrl, params),
		// createCollection: (data) => createCollection(apiUrl, data),
		// updateCollection: (id, data) => updateCollection(apiUrl, id, data),
		// deleteCollection: (slug, projectId) =>
		//   deleteCollection(apiUrl, slug, projectId),

		init: () => init(apiUrl),

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
