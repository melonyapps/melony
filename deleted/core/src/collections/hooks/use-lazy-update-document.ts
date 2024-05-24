"use client";

import { useMutation, useQueryClient } from "react-query";
import { useData } from "./use-data";

export const useLazyUpdateDocument = (collectionSlug: string) => {
  const { updateDocument } = useData();

  const queryClient = useQueryClient();

  const res = useMutation(
    ["updateDocument"],
    ({ id, data }: { id: string; data: any }) =>
      updateDocument(collectionSlug, id, { ...data }),
    {
      // onMutate: async (newDoc) => {
      //   // Cancel any outgoing refetches
      //   // (so they don't overwrite our optimistic update)
      //   await queryClient.cancelQueries({
      //     queryKey: ["getDocument", newDoc.collectionSlug, newDoc.id],
      //   });

      //   // Snapshot the previous value
      //   const previousDoc = queryClient.getQueryData([
      //     "getDocument",
      //     newDoc.collectionSlug,
      //     newDoc.id,
      //   ]);

      //   // Optimistically update to the new value
      //   queryClient.setQueryData(
      //     ["getDocument", newDoc.collectionSlug, newDoc.id],
      //     newDoc
      //   );

      //   // Return a context with the previous and new todo
      //   return { previousDoc, newDoc };
      // },
      // onError: (err, newDoc, context) => {
      //   queryClient.setQueryData(
      //     ["getDocument", newDoc.collectionSlug, context?.newDoc?.id],
      //     context?.previousDoc
      //   );
      // },
      onSettled: (data, error, variables) => {
        Promise.all([
          // queryClient.invalidateQueries({
          //   queryKey: ["getDocuments", variables.collectionSlug],
          // }),
          // queryClient.invalidateQueries({
          //   queryKey: ["getDocument", variables.collectionSlug, variables.id],
          // }),
          queryClient.invalidateQueries({
            queryKey: ["getDocuments"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["getDocument", collectionSlug, variables.id],
          }),
          queryClient.invalidateQueries({ queryKey: ["getInfiniteDocuments"] }),
        ]);
      },
    }
  );

  return res;
};
