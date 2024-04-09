import { fetchClient } from "./fetch";

export const deleteView = async (
  apiUrl: string,
  id: string,
  projectId: string
) => {
  try {
    const res = await fetchClient.delete(
      apiUrl + `/views/${id}?projectId=${projectId}`
    );
    return res.data;
  } catch (err) {}
};
