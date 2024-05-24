import { fetchClient } from "./fetch";

export const logout = async (apiUrl: string, data: any) => {
  try {
    const res = await fetchClient.post(apiUrl + `/logout`, data);
    return res.data;
  } catch (err) {}
};
