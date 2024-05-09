import { comparePasswords, createSession, deleteSession } from "../lib/session";
import { verifySession } from "../lib/dal";
import { CredentialsPayload, UserProps } from "../lib/definitions";
import { AdapterProps } from "@melony/core";

export async function login({
	db,
	payload,
}: {
	db: AdapterProps;
	payload: CredentialsPayload;
}): Promise<UserProps | null> {
	try {
		const res = await db.getDocuments({
			collectionSlug: "users",
			filter: [{ field: "email", operator: "Is", value: payload.email }],
		});

		if (res.docs.length > 0) {
			const user = res.docs?.[0] as UserProps & { password: string };

			const isValid = await comparePasswords(
				payload.password,
				user?.password || "",
			);

			if (isValid) {
				await createSession(user._id);

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

export async function logout() {
	deleteSession();
}

export const getUser = async ({ db }: { db: AdapterProps }) => {
	const session = await verifySession();
	if (!session) return null;

	try {
		const res = await db.getDocument({
			collectionSlug: "users",
			docId: session.userId as string,
		});

		return res.data;
	} catch (error) {
		console.log("Failed to fetch user");
		return null;
	}
};
