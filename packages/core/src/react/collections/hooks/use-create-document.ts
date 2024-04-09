import { useProject } from "../../projects";
import { useMutation, useQueryClient } from "react-query";
import { useData } from "./use-data";

export const useCreateDocument = (collectionSlug: string) => {
  const { createDocument } = useData();

  const queryClient = useQueryClient();

  const { projectId } = useProject();

  return useMutation(
    ["createDocument"],
    (data: any) => createDocument(collectionSlug, { ...data, projectId }),
    {
      // onMutate: async (newDoc) => {
      //   // Cancel any outgoing refetches
      //   // (so they don't overwrite our optimistic update)
      //   await queryClient.cancelQueries({
      //     queryKey: ["createDocument", collectionSlug, newDoc._id],
      //   });

      //   // Optimistically update to the new value
      //   queryClient.setQueryData(["createDocument"], newDoc);

      //   // Return a context with the previous and new todo
      //   return { newDoc: newDoc };
      // },
      onSettled: (data, err, variables, ctx) => {
        // console.log(data);
        // console.log(variables);
        // console.log(ctx);
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["getDocuments"] }),
          queryClient.invalidateQueries({ queryKey: ["getInfiniteDocuments"] }),
        ]);
      },
    }
  );
};
