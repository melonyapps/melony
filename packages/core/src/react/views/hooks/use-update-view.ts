import { useProject } from "../../projects";
import { useMutation, useQueryClient } from "react-query";
import { useData } from "../../collections/hooks/use-data";

export const useUpdateView = (id: string) => {
  const { updateView } = useData();
  const queryClient = useQueryClient();

  const { projectId } = useProject();

  const res = useMutation(
    ["updateView", id],
    (data: any) => updateView(id, { ...data, projectId }),
    {
      // onMutate: async (newDoc) => {
      //   // Cancel any outgoing refetches
      //   // (so they don't overwrite our optimistic update)
      //   await queryClient.cancelQueries({
      //     queryKey: ["presentView", id, newDoc._id],
      //   });

      //   // Snapshot the previous value
      //   const previousDoc = queryClient.getQueryData([
      //     "presentView",
      //     id,
      //     newDoc._id,
      //   ]);

      //   // Optimistically update to the new value
      //   // queryClient.setQueryData(["presentView", id, newDoc._id], newDoc);

      //   // Return a context with the previous and new todo
      //   // return { previousDoc, newDoc: newDoc };
      // },
      onSettled: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getViews"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["getView", id],
          }),
          queryClient.invalidateQueries({
            queryKey: ["presentView", id],
          }),
        ]);
      },
    }
  );

  return res;
};
