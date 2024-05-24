"use client";

import React from "react";
import { Collection, Field, View } from "../config";
import { FilterItem } from "../filter/types";

export interface ICollectionContext {
  data?: Collection;
  view?: View;
  slug: string;
  params?: CollectionParams;
  isLoading: boolean;
  result: { docs: any[]; meta: { count: number; groups?: any } };
  schema: Field[];
  refetch: () => void;
  search: (searchTerm: string) => void;
  filter: (filter: FilterItem[]) => void;
  group: (params?: GroupingProps) => void;
  sort: (params?: SortingProps) => void;
  updateDoc: (data: any, params?: any) => void;
  createDoc: (data: any, params?: any) => void;
  deleteDoc: (id: string, params?: any) => void;
  isCreatingDoc?: boolean;
  isUpdatingDoc?: boolean;
  isDeletingDoc?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
}

export type GroupingProps = {
  field: string;
  orientation: "vertical" | "horizontal";
};
export type SortingProps = { field: string; direction: "desc" | "asc" };

export type CollectionParams = {
  searchTerm?: string;
  filter?: FilterItem[];
  group?: GroupingProps;
  sort?: SortingProps;
};

export const CollectionContext = React.createContext<ICollectionContext>({
  data: { slug: "undefined", schema: [] },
  slug: "",
  isLoading: true,
  result: { docs: [], meta: { count: 0 } },
  schema: [],
  refetch: () => {},
  search: () => {},
  filter: () => {},
  group: () => {},
  sort: () => {},
  createDoc: () => {},
  updateDoc: () => {},
  deleteDoc: () => {},
  fetchNextPage: () => {},
});
