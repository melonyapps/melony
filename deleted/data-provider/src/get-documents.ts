import { fetchClient } from "./fetch";

export const getDocuments = async (
  apiUrl: string,
  projectId: string,
  collectionSlug: string,
  params?: any
) => {
  try {
    const res = await fetchClient.get(
      apiUrl + `/${collectionSlug}?projectId=${projectId}`,
      {
        params,
      }
    );

    return res.data;
  } catch (err) {}
};
