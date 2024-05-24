import { fetchClient } from "./fetch";

export const login = async (apiUrl: string, data: any) => {
  try {
    const res = await fetchClient.post(apiUrl + `/login`, data);
    return res.data;
  } catch (err) {}
};
