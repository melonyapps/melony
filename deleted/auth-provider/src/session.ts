import { fetchClient } from "./fetch";

export const session = async (apiUrl: string) => {
	try {
		const res = await fetchClient.post(apiUrl + `/session`);
		return res.data;
	} catch (err) {}
};
