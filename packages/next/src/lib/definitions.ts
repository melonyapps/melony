import { z } from "zod";

export const LoginFormSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.min(8, { message: "Be at least 8 characters long" })
		.regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
		.regex(/[0-9]/, { message: "Contain at least one number." })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Contain at least one special character.",
		})
		.trim(),
});

export type FormState =
	| {
			errors?: {
				name?: string[];
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;

export type SessionPayload = {
	userId: string;
	expiresAt: Date;
};

export type CredentialsPayload = {
	email: string;
	password: string;
};

export type UserProps = {
	_id: string;
	email: string;
	image?: string;
	name?: string;
};
