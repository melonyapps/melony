import { fetchClient } from "./fetch";

export const createMember = async (apiUrl: string, data: any) => {
  try {
    const res = await fetchClient.post(apiUrl + "/members", data);
    return res.data;
  } catch (err) {}
};
