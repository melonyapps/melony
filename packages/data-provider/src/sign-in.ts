import { fetchClient } from "./fetch";

export const signIn = async (apiUrl: string) => {
  try {
    const res = await fetchClient.post(apiUrl + "/auth/login");
    return res.data;
  } catch (err) {}
};
