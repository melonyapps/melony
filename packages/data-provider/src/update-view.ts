import { fetchClient } from "./fetch";

export const updateView = async (apiUrl: string, id: string, data: any) => {
  try {
    const res = await fetchClient.put(apiUrl + `/views/${id}`, data);
    return res.data;
  } catch (err) {}
};
