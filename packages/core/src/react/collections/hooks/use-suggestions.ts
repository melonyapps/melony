"use client";

import { useData } from "./use-data";
import { useQuery } from "react-query";

export const useSuggestions = (params?: {
  collectionSlug: string;
  include?: string[];
}) => {
  const { getSuggestions } = useData();

  return useQuery(["getSuggestions", params], () =>
    getSuggestions("", { ...params })
  );
};
