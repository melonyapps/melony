import { useQuery } from "react-query";
import { useProject } from "../../projects";
import { useData } from "../../collections/hooks/use-data";

export const useGetViews = (params?: any) => {
  const { getViews } = useData();
  const { projectId } = useProject();

  return useQuery(["getViews", params, projectId], () =>
    getViews({ ...params, projectId })
  );
};
