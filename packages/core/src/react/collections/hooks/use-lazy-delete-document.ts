"use client";

import { useMutation, useQueryClient } from "react-query";
import { useData } from "./use-data";

export const useLazyDeleteDocument = (collectionSlug: string) => {
  const { deleteDocument } = useData();

  const queryClient = useQueryClient();

  const res = useMutation(
    ["deleteDocument"],
    (id: string) => deleteDocument(collectionSlug, id, ""),
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
