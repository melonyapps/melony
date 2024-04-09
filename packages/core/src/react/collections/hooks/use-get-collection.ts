import { useQuery } from "react-query";
import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";

export const useGetCollection = (slug: string) => {
  const { getCollection } = useData();
  const { projectId } = useProject();

  return useQuery(["getCollection", slug], () =>
    getCollection(slug, projectId)
  );
};
