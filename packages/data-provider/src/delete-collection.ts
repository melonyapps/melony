import { fetchClient } from "./fetch";

export const deleteCollection = async (
  apiUrl: string,
  slug: string,
  projectId: string
) => {
  try {
    const res = await fetchClient.delete(
      apiUrl + `/collections/${slug}?projectId=${projectId}`
    );
    return res.data;
  } catch (err) {}
};
