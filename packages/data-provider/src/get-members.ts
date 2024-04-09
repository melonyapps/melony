import { fetchClient } from "./fetch";

export const getMembers = async (apiUrl: string, params: any) => {
  try {
    const res = await fetchClient.get(apiUrl + "/members", { params });
    return res.data;
  } catch (err) {}
};
