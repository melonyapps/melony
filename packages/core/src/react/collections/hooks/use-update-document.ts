import { useMutation, useQueryClient } from "react-query";
import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";

export const useUpdateDocument = (collectionSlug: string, id: string) => {
  const { updateDocument } = useData();
  const { projectId } = useProject();

  const queryClient = useQueryClient();

  const res = useMutation(
    ["updateDocument", id],
    (data: any) => updateDocument(collectionSlug, id, { ...data, projectId }),
    {
      // onMutate: async (newDoc) => {
      //   // Cancel any outgoing refetches
      //   // (so they don't overwrite our optimistic update)
      //   await queryClient.cancelQueries({
      //     queryKey: ["getDocument", collectionSlug, newDoc._id],
      //   });

      //   // Snapshot the previous value
      //   const previousDoc = queryClient.getQueryData([
      //     "getDocument",
      //     collectionSlug,
      //     newDoc._id,
      //   ]);

      //   // Optimistically update to the new value
      //   queryClient.setQueryData(
      //     ["getDocument", collectionSlug, newDoc._id],
      //     newDoc
      //   );

      //   // Return a context with the previous and new todo
      //   return { previousDoc, newDoc: newDoc };
      // },
      // onError: (err, newDoc, context) => {
      //   queryClient.setQueryData(
      //     ["getDocument", collectionSlug, context?.newDoc?.id],
      //     context?.previousDoc
      //   );
      // },
      onSettled: (data, error, variables) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getDocuments"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["getDocument", collectionSlug, variables._id],
          }),
          queryClient.invalidateQueries({ queryKey: ["getInfiniteDocuments"] }),
        ]);
      },
    }
  );

  return res;
};
