import { fetchClient } from "./fetch";

export const createDocument = async (
  apiUrl: string,
  collectionSlug: string,
  data: any
) => {
  try {
    const res = await fetchClient.post(apiUrl + `/${collectionSlug}`, data);
    return res.data;
  } catch (err) {}
};
