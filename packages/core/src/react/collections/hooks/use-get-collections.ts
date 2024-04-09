import { useQuery } from "react-query";
import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";

export const useGetCollections = (params: any) => {
  const { getCollections } = useData();
  const { projectId } = useProject();

  return useQuery(["getCollections", params, projectId], () =>
    getCollections({ projectId, ...params })
  );
};
