import { fetchClient } from "./fetch";

export const getCollections = async (
  apiUrl: string,
  params: { projectId: string }
) => {
  try {
    const res = await fetchClient.get(apiUrl + "/collections", {
      params,
    });
    return res.data;
  } catch (err) {}
};
