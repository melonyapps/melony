import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";
import { useQuery } from "react-query";

export const useGetDocuments = (collectionSlug: string, params?: any) => {
  const { getDocuments } = useData();
  const { projectId } = useProject();

  return useQuery(["getDocuments", collectionSlug, params], () =>
    getDocuments(projectId, collectionSlug, params)
  );
};
