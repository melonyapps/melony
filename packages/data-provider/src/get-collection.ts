import { fetchClient } from "./fetch";

export const getCollection = async (
  apiUrl: string,
  slug: string,
  projectId: string
) => {
  try {
    const res = await fetchClient.get(
      apiUrl + `/collections/${slug}?projectId=${projectId}`
    );
    return res.data;
  } catch (err) {}
};
