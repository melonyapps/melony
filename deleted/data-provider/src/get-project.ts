import { fetchClient } from "./fetch";

export const getProject = async (apiUrl: string, id: string) => {
  try {
    const res = await fetchClient.get(apiUrl + `/projects/${id}`);
    return res.data;
  } catch (err) {}
};
