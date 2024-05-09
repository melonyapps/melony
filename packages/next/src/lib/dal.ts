import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt, updateSession } from "./session";

export const verifySession = async () => {
	const cookie = cookies().get("session")?.value;
	const session = await decrypt(cookie);

	if (!session?.userId) {
		redirect("/login");
	}

	await updateSession();

	return { isAuth: true, userId: session.userId };
};
