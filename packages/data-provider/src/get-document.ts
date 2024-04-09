import { fetchClient } from "./fetch";

export const getDocument = async (
  apiUrl: string,
  projectId: string,
  collectionSlug: string,
  id: string,
  params?: any
) => {
  try {
    const res = await fetchClient.get(
      apiUrl + `/${collectionSlug}/${id}?projectId=${projectId}`,
      {
        params,
      }
    );
    return res.data;
  } catch (err) {}
};
