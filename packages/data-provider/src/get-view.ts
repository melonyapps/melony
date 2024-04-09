import { fetchClient } from "./fetch";

export const getView = async (
  apiUrl: string,
  id: string,
  projectId: string,
  params: any
) => {
  try {
    const res = await fetchClient.get(
      apiUrl +
        `/views/${id}?projectId=${projectId}&` +
        new URLSearchParams(params)
    );
    return res.data;
  } catch (err) {}
};
