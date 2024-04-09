import React from "react";
import {
  CollectionContext,
  CollectionParams,
  GroupingProps,
  SortingProps,
  useCreateDocument,
  useInfiniteDocs,
  useLazyDeleteDocument,
  useLazyUpdateDocument,
  useUpdateCollection,
} from ".";
import { useConfig } from "..";

export function CollectionProvider({
  children,
  slug,
  viewSlug,
  baseParams,
  parentDocId,
  onUpdateParams,
}: {
  children: React.ReactNode;
  slug: string;
  viewSlug?: string;
  parentDocId?: string;
  baseParams?: CollectionParams;
  onUpdateParams?: (values: CollectionParams) => void;
}) {
  const { config } = useConfig();

  const [params, setParams] = React.useState<CollectionParams>({
    ...baseParams,
    sort: baseParams?.sort || { field: "createdAt", direction: "desc" },
  });

  const data = config.collections.find((x) => x.slug === slug);
  const view = (data?.views || []).find((x) => x.slug === viewSlug);

  const schema = [
    ...(data?.schema || []),
    { slug: "createdAt", label: "Created at", type: "DATE" },
  ];

  const res = useInfiniteDocs(slug, {
    ...params,
    parentDocId,
    perPage: 100,
  });

  const { mutate: createDoc, isLoading: isCreatingDoc } =
    useCreateDocument(slug);

  const { mutate: updateDoc, isLoading: isUpdatingDoc } =
    useLazyUpdateDocument(slug);

  const { mutate: deleteDoc, isLoading: isDeletingDoc } =
    useLazyDeleteDocument(slug);

  const { mutate: updateCollection, isLoading: isUpdatingCollection } =
    useUpdateCollection(slug);

  const handleSearch = (searchTerm: string) => {
    setParams({ searchTerm });
  };

  const handleFilter = (filter?: any[]) => {
    setParams({ filter });
  };

  const handleGroup = (group?: GroupingProps) => {
    setParams({ group });
  };

  const handleSort = (sort?: SortingProps) => {
    setParams({ sort });
  };

  const value = {
    schema,
    data,
    view,
    slug,
    params,
    isLoading: res.isLoading,
    result: {
      docs: res?.data?.pages
        ? [...res.data.pages.map((group) => group?.docs || [])].flat()
        : [],
      meta: { count: res?.data?.pages?.[0]?.meta?.count || 0 },
    },
    hasNextPage: res.hasNextPage,
    fetchNextPage: res.fetchNextPage,
    isFetchingNextPage: res.isFetchingNextPage,
    refetch: res.refetch,
    search: handleSearch,
    filter: handleFilter,
    group: handleGroup,
    sort: handleSort,
    updateDoc,
    createDoc,
    deleteDoc,
    updateCollection,
    isUpdatingCollection,
    isUpdatingDoc,
    isCreatingDoc,
    isDeletingDoc,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}
