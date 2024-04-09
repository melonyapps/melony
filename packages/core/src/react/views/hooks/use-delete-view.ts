import { useMutation, useQueryClient } from "react-query";
import { useProject } from "../../projects";
import { useData } from "../../collections/hooks/use-data";

export const useDeleteView = (id: string) => {
  const { deleteView } = useData();
  const { projectId } = useProject();

  const queryClient = useQueryClient();

  return useMutation(["deleteView", id], () => deleteView(id, projectId), {
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getViews"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getView", id],
        }),
      ]);
    },
  });
};
