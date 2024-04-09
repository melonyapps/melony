import { useQuery } from "react-query";
import { useAuth } from "..";

export const useGetIdentity = () => {
  const { getIdentity } = useAuth();

  return useQuery(["getIdentity"], getIdentity, { retry: false });
};
