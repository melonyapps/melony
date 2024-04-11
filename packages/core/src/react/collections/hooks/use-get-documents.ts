"use client";

import { useData } from "./use-data";
import { useQuery } from "react-query";

export const useGetDocuments = (collectionSlug: string, params?: any) => {
  const { getDocuments } = useData();

  return useQuery(["getDocuments", collectionSlug, params], () =>
    getDocuments("", collectionSlug, params)
  );
};
