"use client";

import { useMutation, useQueryClient } from "react-query";
import { useData } from "./use-data";

export const useDeleteDocument = (collectionSlug: string, id: string) => {
  const { deleteDocument } = useData();

  const queryClient = useQueryClient();

  return useMutation(
    ["deleteDocument", id],
    () => deleteDocument(collectionSlug, id, ""),
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
