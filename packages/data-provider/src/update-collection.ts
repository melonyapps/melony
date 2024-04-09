import { fetchClient } from "./fetch";

export const updateCollection = async (
  apiUrl: string,
  id: string,
  data: any
) => {
  try {
    const res = await fetchClient.put(apiUrl + `/collections/${id}`, data);
    return res.data;
  } catch (err) {}
};
