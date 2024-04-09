import { login } from "./login";
import { logout } from "./logout";

export const authProvider = ({ apiUrl }: { apiUrl: string }) => {
  return {
    login: (data: any) => login(apiUrl, data),
    logout: (data: any) => logout(apiUrl, data),
  };
};
