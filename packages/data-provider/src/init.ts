import { fetchClient } from "./fetch";

export const init = async (apiUrl: string) => {
  try {
    const res = await fetchClient.get(apiUrl + `/init`);
    return res.data;
  } catch (err) {}
};
