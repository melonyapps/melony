import { login } from "./login";
import { logout } from "./logout";
import { session } from "./session";

export const authProvider = ({ apiUrl }: { apiUrl: string }) => {
	return {
		login: (data: any) => login(apiUrl, data),
		logout: (data: any) => logout(apiUrl, data),
		session: (data: any) => session(apiUrl),
	};
};
