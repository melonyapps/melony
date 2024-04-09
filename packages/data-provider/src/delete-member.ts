import { fetchClient } from "./fetch";

export const deleteMember = async (apiUrl: string, id: string, params: any) => {
  try {
    const res = await fetchClient.delete(apiUrl + `/members/${id}`, {
      params,
    });
    return res.data;
  } catch (err) {}
};
