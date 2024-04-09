import { fetchClient } from "./fetch";

export const deleteDocument = async (
  apiUrl: string,
  collectionSlug: string,
  id: string,
  projectId: string
) => {
  try {
    const res = await fetchClient.delete(
      apiUrl + `/${collectionSlug}/${id}?projectId=${projectId}`
    );
    return res.data;
  } catch (err) {}
};
