import { useQuery } from "react-query";
import { useAuth } from "..";

export const useCheckAuth = (params?: any) => {
  const { checkAuth } = useAuth();

  return useQuery(["checkAuth", params], checkAuth);
};
