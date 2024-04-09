import { fetchClient } from "./fetch";

export const upload = async (
  apiUrl: string,
  data: FormData,
  projectId: string
) => {
  try {
    const res = await fetchClient.postForm(
      apiUrl + `/uploads?projectId=${projectId}`,
      data
    );
    return res.data;
  } catch (err) {}
};
