import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";
import { useQuery } from "react-query";

export const useSuggestions = (params?: {
  collectionSlug: string;
  include?: string[];
}) => {
  const { getSuggestions } = useData();
  const { projectId } = useProject();

  return useQuery(["getSuggestions", params], () =>
    getSuggestions(projectId, { ...params })
  );
};
