import { fetchClient } from "./fetch";

export const createCollection = async (apiUrl: string, data: any) => {
  try {
    const res = await fetchClient.post(apiUrl + "/collections", {
      ...data,
    });
    return res.data;
  } catch (err) {}
};
