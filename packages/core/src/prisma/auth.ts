"use server";

import { LoginActionPayload, User } from "@melony/types";
import {
	comparePasswords,
	createSession,
	deleteSession,
	getDoc,
	verifySession,
} from "..";

export async function loginAction(
	payload: LoginActionPayload,
): Promise<User | null> {
	"use server"; // TODO: i dont understand why the module at top not working

	try {
		const user = await getDoc({
			modelName: "users",
			where: { email: payload.email },
		});

		if (user) {
			const isValid = await comparePasswords(
				payload.password,
				user?.password || "",
			);

			if (isValid) {
				await createSession(user.id);

				return user;
			} else {
				return null;
			}
		} else {
			return null;
		}
	} catch (err) {
		return null;
	}
}

export async function logoutAction() {
	"use server";

	deleteSession();
}

export const getUserAction = async () => {
	"use server";

	const session = await verifySession();
	if (!session) return null;

	try {
		const user = await getDoc({
			modelName: "users",
			where: { id: session.userId },
		});

		return user;
	} catch (error) {
		console.log("Failed to fetch user");
		return null;
	}
};
