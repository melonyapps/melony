import { fetchClient } from "./fetch";

export const getViews = async (
  apiUrl: string,
  params: { projectId: string }
) => {
  try {
    const res = await fetchClient.get(apiUrl + "/views", {
      params,
    });
    return res.data;
  } catch (err) {}
};
