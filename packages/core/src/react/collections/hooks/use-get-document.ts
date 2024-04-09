import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";
import { useQuery } from "react-query";

export const useGetDocument = (collectionSlug: string, id: string) => {
  const { getDocument } = useData();
  const { projectId } = useProject();

  return useQuery(["getDocument", collectionSlug, id], () =>
    getDocument(projectId, collectionSlug, id)
  );
};
