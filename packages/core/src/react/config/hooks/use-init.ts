import { useQuery } from "react-query";
import { useData } from "../..";

export const useInit = () => {
  const { init } = useData();

  return useQuery(["init"], () => init());
};
