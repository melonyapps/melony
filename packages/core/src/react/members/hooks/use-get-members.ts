import { useQuery } from "react-query";
import { useProject } from "../../projects";
import { useData } from "../../collections/hooks/use-data";

export const useGetMembers = () => {
  const { projectId } = useProject();
  const { getMembers } = useData();

  return useQuery(["getMembers"], () => getMembers({ pId: projectId }));
};
