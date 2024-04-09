import React from "react";
import {
  CollectionParams,
  IView,
  ViewContext,
  useCollection,
  useGetView,
  useGetViews,
  useProject,
  useView,
} from "@melony/core";
import { DataTable } from "@melony/ui/data-table";
import { Input } from "@melony/ui/input";
import { CollectionProvider } from "./collections";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FieldDate } from "./fields/field-date";
import { DocumentProvider } from "./documents";
import { FieldDocument } from "./fields/field-document";
import { FieldLocation } from "./fields/field-location";
import { FieldRelated } from "./fields/field-related";
import { Button } from "@melony/ui/button";
import { EyeIcon, Plus } from "lucide-react";
import { Skeleton } from "@melony/ui/skeleton";
import { cn } from "@melony/ui/lib";
import { FieldUser } from "./fields/field-user";

export function ViewProvider({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  const { data, isLoading } = useGetView(slug);

  const value = { isLoading, data, onUpdateView: () => {} };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}

export function ViewWithCollection({
  vSlug,
  cSlug,
  children,
  initialParams,
}: {
  vSlug: string;
  cSlug: string; // in case view does not exist
  children?: JSX.Element;
  initialParams?: CollectionParams;
}): JSX.Element {
  return (
    <ViewProvider slug={vSlug}>
      <ViewContext.Consumer>
        {({ data, isLoading }) => {
          return (
            <CollectionProvider
              slug={data?.collectionSlug || cSlug}
              params={{ ...data?.collectionParams, ...initialParams }}
            >
              {children}
            </CollectionProvider>
          );
        }}
      </ViewContext.Consumer>
    </ViewProvider>
  );
}

export function ViewLayout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const params = useParams();

  const cSlug = (params?.cSlug as string) || "";
  const vSlug = (params?.vSlug as string) || "";

  return (
    <ViewWithCollection vSlug={vSlug} cSlug={cSlug}>
      {children}
    </ViewWithCollection>
  );
}

export function ViewHeader({
  onClickCreate,
  onSwitchView,
  activeSlug,
}: {
  onClickCreate?: () => void;
  onSwitchView?: (collectionSlug: string, viewSlug: string) => void;
  activeSlug?: string;
}) {
  const navigate = useNavigate();
  const { projectId } = useProject();

  const { data: viewData } = useView();
  const { data: collectionData, isLoading } = useCollection();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 px-4 h-[52px] border-b">
        <div className="text-lg">
          {isLoading ? (
            <Skeleton className="h-4 w-[140px]" />
          ) : (
            collectionData?.title
          )}
        </div>
      </div>

      <div className="py-4 px-2.5 h-[52px] flex justify-between items-center gap-2 border-b">
        <div className="h-[52px] flex items-center gap-2">
          {/* <div>
            <Button variant="secondary">Views</Button>
          </div>
          <div>
            <Button variant="secondary">Create</Button>
          </div> */}
          <div>
            <Input placeholder="Search by title..." />
          </div>

          <div>
            <Button variant="ghost">Filter</Button>
          </div>
          <div>
            <Button variant="ghost">Sort</Button>
          </div>
          <div>
            <Button variant="ghost">Group</Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2"></div>

          <div>
            <Button
              onClick={() => {
                navigate(
                  `/p/${projectId}/c/${collectionData?.slug}/v/${viewData?.slug || "base"}/create`
                );
              }}
            >
              <Plus className="h-4 w-4 mr-2" /> Create doc
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ViewBody({}: {}): JSX.Element {
  const navigate = useNavigate();
  const { projectId } = useProject();

  const { data: viewData } = useView();

  const {
    slug,
    data: collectionData,
    isLoading,
    fields,
    params,
    result,
    updateDoc,
    isUpdatingDoc,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    updateCollection,
  } = useCollection();

  switch (viewData?.type) {
    default:
      return (
        <DataTable
          isLoading={isLoading}
          rowWrapper={DocumentProvider}
          columns={fields.map((field) => ({
            accessorKey: field.key,
            header: () => <div className="">{field.title}</div>,
            cell: ({ row }) => {
              switch (field.type) {
                case "TEXT":
                  if (field.key === "title") {
                    return (
                      <div
                        className={cn(
                          "min-w-[120px] w-full cursor-pointer truncate",
                          {
                            "font-semibold": field.key === "title",
                          }
                        )}
                        onClick={() => {
                          navigate(
                            `/p/${projectId}/c/${collectionData?.slug}/v/${viewData?.slug || "base"}/${row.original?._id || ""}`
                          );
                        }}
                      >
                        {row.getValue(field.key)}
                      </div>
                    );
                  }

                  return (
                    <div className={cn("min-w-[120px] max-w-[340px] truncate")}>
                      {row.getValue(field.key)}
                    </div>
                  );
                case "LONGTEXT":
                  return (
                    <div className="block truncate">
                      {row.getValue(field.key)}
                    </div>
                  );
                case "DATE":
                  return <FieldDate field={field} />;
                case "DOCUMENT":
                  return <FieldDocument field={field} />;
                case "LOCATION":
                  return <FieldLocation field={field} />;
                case "RELATED":
                  return <FieldRelated field={field} />;
                case "MEMBER":
                  return <FieldUser field={field} />;

                default:
                  return (
                    <div className="z">
                      {JSON.stringify(row.getValue(field.key))}
                    </div>
                  );
              }
            },
          }))}
          data={result.docs}
        />
      );
  }
}

type ViewsNavProps = {
  // activeSlug?: string;
  // onClickItem: (collectionSlug: string, viewSlug: string) => void;
  // onClickEdit: (slug: string) => void;
  // onClickDelete: (slug: string) => void;
};

export function ViewsNav({}: ViewsNavProps) {
  const { slug } = useCollection();
  const { projectId } = useProject();
  const params = useParams();

  const { data = [], isLoading } = useGetViews({
    // collectionSlug: slug,
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

  return (
    <div className="flex flex-col gap-2">
      {/* <div className="flex items-center justify-between p-2">
        <span className="text-xs opacity-60">Views</span>
      </div> */}

      <nav className="flex flex-col gap-0.5">
        {data.map((item: IView) => (
          <NavLink
            key={item._id}
            to={`/p/${projectId}/c/${item?.collectionSlug}/v/${item.slug}`}
            className={cn(
              "inline-flex items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start",
              { "text-accent-foreground bg-muted": params?.vSlug === item.slug }
            )}
          >
            <span className="mr-2">
              {item?.icon || <EyeIcon className="h-4 w-4" />}
            </span>
            <span className="block truncate">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
