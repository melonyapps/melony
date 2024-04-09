import { useProject } from "../../projects";
import { useQuery } from "react-query";
import { IView } from "../types";
import { useData } from "../../collections/hooks/use-data";

export const useGetView = (id: string, params?: any) => {
  const { getView } = useData();
  const { projectId } = useProject();

  return useQuery<IView>(["getView", id], () => getView(id, projectId, params));
};
