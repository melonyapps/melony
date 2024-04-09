import { fetchClient } from "./fetch";

export const getProjects = async (apiUrl: string) => {
  try {
    const res = await fetchClient.get(apiUrl + "/projects");
    return res.data;
  } catch (err) {}
};
