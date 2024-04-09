import { fetchClient } from "./fetch";

export const createView = async (apiUrl: string, data: any) => {
  try {
    const res = await fetchClient.post(apiUrl + "/views", {
      ...data,
    });

    return res.data;
  } catch (err) {}
};
