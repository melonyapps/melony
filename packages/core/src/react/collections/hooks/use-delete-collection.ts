import { useMutation, useQueryClient } from "react-query";
import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";

export const useDeleteCollection = (slug: string) => {
  const { deleteCollection } = useData();
  const { projectId } = useProject();

  const queryClient = useQueryClient();

  return useMutation(
    ["deleteCollection", slug],
    () => deleteCollection(slug, projectId),
    {
      onSettled: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getCollections"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["getCollection", slug],
          }),
        ]);
      },
    }
  );
};
