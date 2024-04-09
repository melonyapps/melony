import { useMutation, useQueryClient } from "react-query";
import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";

export const useLazyDeleteDocument = (collectionSlug: string) => {
  const { deleteDocument } = useData();
  const { projectId } = useProject();

  const queryClient = useQueryClient();

  const res = useMutation(
    ["deleteDocument"],
    (id: string) => deleteDocument(collectionSlug, id, projectId),
    {
      onSettled: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getDocuments"],
          }),
          queryClient.invalidateQueries({ queryKey: ["getInfiniteDocuments"] }),
        ]);
      },
    }
  );

  return res;
};
