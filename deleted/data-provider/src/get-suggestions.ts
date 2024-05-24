import { fetchClient } from "./fetch";

export const getSuggestions = async (
  apiUrl: string,
  projectId: string,
  params?: any
) => {
  try {
    const res = await fetchClient.get(
      apiUrl +
        `/suggestions?projectId=${projectId}&` +
        new URLSearchParams(params)
    );
    return res.data;
  } catch (err) {}
};
