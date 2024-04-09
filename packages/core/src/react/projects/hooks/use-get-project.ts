import { useQuery } from "react-query";
import { useData } from "../../collections/hooks/use-data";

export const useGetProject = (id: string) => {
  const { getProject } = useData();

  return useQuery(["getProject", id], () => getProject(id));
};
