import { fetchClient } from "./fetch";

export const addField = async (
  apiUrl: string,
  collectionSlug: string,
  data: any
) => {
  try {
    const res = await fetchClient.post(
      apiUrl + `/collections/${collectionSlug}/addField`,
      data
    );
    return res.data;
  } catch (err) {}
};
