import { fetchClient } from "./fetch";

export const updateDocument = async (
  apiUrl: string,
  collectionSlug: string,
  id: string,
  data: any
) => {
  try {
    const res = await fetchClient.put(
      apiUrl + `/${collectionSlug}/${id}`,
      data
    );
    return res.data;
  } catch (err) {}
};
