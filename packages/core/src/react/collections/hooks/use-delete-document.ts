import { useMutation, useQueryClient } from "react-query";
import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";

export const useDeleteDocument = (collectionSlug: string, id: string) => {
  const { deleteDocument } = useData();
  const { projectId } = useProject();

  const queryClient = useQueryClient();

  return useMutation(
    ["deleteDocument", id],
    () => deleteDocument(collectionSlug, id, projectId),
    {
      onSettled: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getDocuments"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["getDocument", id],
          }),
          queryClient.invalidateQueries({ queryKey: ["getInfiniteDocuments"] }),
        ]);
      },
    }
  );
};
