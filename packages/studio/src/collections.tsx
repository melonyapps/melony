import React from "react";
import {
  CollectionContext,
  useCreateDocument,
  useInfiniteDocs,
  useLazyDeleteDocument,
  useLazyUpdateDocument,
  CollectionParams,
  FieldProps,
  GroupingProps,
  SortingProps,
  useProject,
  useUpdateCollection,
  useGetCollections,
  useGetCollection,
  Collection,
} from "@melony/core";
import { NavLink, useParams } from "react-router-dom";
import { cn } from "@melony/ui/lib";
import { Folder } from "lucide-react";
import { Skeleton } from "@melony/ui/skeleton";

export function CollectionProvider({
  children,
  slug,
  params,
  parentDocId,
  onUpdateParams,
}: {
  children: React.ReactNode;
  slug: string;
  parentDocId?: string;
  params?: CollectionParams;
  onUpdateParams?: (values: CollectionParams) => void;
}) {
  const { data: data } = useGetCollection(slug);

  const fields: FieldProps[] = data?.fields || [];

  const res = useInfiniteDocs(slug, {
    ...params,
    parentDocId,
    perPage: 100,
  });

  const { mutate: createDoc, isLoading: isCreatingDoc } =
    useCreateDocument(slug);

  const { mutate: updateDoc, isLoading: isUpdatingDoc } =
    useLazyUpdateDocument();

  const { mutate: deleteDoc, isLoading: isDeletingDoc } =
    useLazyDeleteDocument(slug);

  const { mutate: updateCollection, isLoading: isUpdatingCollection } =
    useUpdateCollection(slug);

  const handleSearch = (searchTerm: string) => {
    onUpdateParams && onUpdateParams({ searchTerm });
  };

  const handleFilter = (filter?: any[]) => {
    onUpdateParams && onUpdateParams({ filter });
  };

  const handleGroup = (group?: GroupingProps) => {
    onUpdateParams && onUpdateParams({ group });
  };

  const handleSort = (sort?: SortingProps) => {
    onUpdateParams && onUpdateParams({ sort });
  };

  const handleUpdateDoc = (id: string, data: any, params?: any) => {
    updateDoc({
      collectionSlug: slug,
      id,
      data,
    });

    params?.onSuccess();
  };

  const value = {
    fields,
    data,
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
    updateDoc: handleUpdateDoc,
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

type CollectionsNavProps = {};

export function CollectionsNav({}: CollectionsNavProps) {
  const [createVisible, setCreateVisible] = React.useState(false);
  const { projectId } = useProject();

  const params = useParams();

  const { data = { docs: [], count: 0 }, isLoading } = useGetCollections({
    sort: { field: "order", dir: "asc" },
  });

  if (isLoading)
    return (
      <nav className="flex flex-col gap-0.5">
        {[1, 2, 3, 4].map((item, i) => (
          <NavLink
            to={"#"}
            key={i}
            className={cn(
              "inline-flex items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start"
            )}
          >
            <Skeleton className="h-4 w-[120px]" />
          </NavLink>
        ))}
      </nav>
    );

  if (!projectId) return <></>;

  return (
    <div className="flex flex-col gap-2">
      {/* <div className="flex items-center justify-between p-2">
        <span className="text-xs opacity-60">Collections</span>
        <Button size="icon" variant="ghost">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div> */}

      <nav className="flex flex-col gap-0.5">
        {data.docs.map((item: Collection) => (
          <NavLink
            to={`/p/${projectId}/c/${item.slug}/v/base`}
            key={item._id}
            className={cn(
              "inline-flex items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start",
              { "text-accent-foreground bg-muted": params?.cSlug === item.slug }
            )}
          >
            <span className="mr-2">{<Folder className="h-4 w-4" />}</span>
            <span className="block truncate">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
