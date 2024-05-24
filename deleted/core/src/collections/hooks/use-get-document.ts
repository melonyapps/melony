"use client";

import { useData } from "./use-data";
import { useQuery } from "react-query";

export const useGetDocument = (collectionSlug: string, id: string) => {
  const { getDocument } = useData();

  return useQuery(["getDocument", collectionSlug, id], () =>
    getDocument("", collectionSlug, id)
  );
};
