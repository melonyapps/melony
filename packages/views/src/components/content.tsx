import * as React from "react";
import { DocumentProvider, useCollection } from "@melony/core/react";
import { DataTable } from "@melony/ui/data-table";
import { FIELDS } from "../constants";
import { useNavigate } from "react-router-dom";
import { Card } from "@melony/ui/card";
import { filterEditableFields } from "../helpers/filter-editable-fields";

export function Content() {
  const navigate = useNavigate();

  const { slug, isLoading, schema, result, view } = useCollection();

  const filteredSchema = filterEditableFields(schema);

  switch (view?.type) {
    case "CARDS":
      return (
        <div className="grid sm:grid-cols-4 2xl:grid-cols-6 gap-2 p-4">
          {result.docs.map((doc) => (
            <Card
              key={doc._id}
              className="cursor-pointer"
              onClick={() => {
                navigate(
                  `/c/${slug}/v/${view?.slug || "base"}/d/show/${doc._id}`
                );
              }}
            >
              <div className="py-3 px-4 flex flex-col gap-3">
                {schema.map((field) => {
                  const Comp =
                    FIELDS[field?.type || "TEXT"]?.["default"] || (() => <></>);

                  return (
                    <div key={field.slug} className="flex flex-col gap-1">
                      <p className="text-sm text-muted-foreground block truncate">
                        {field?.label || field.slug}
                      </p>
                      <p className="font-medium leading-none block truncate">
                        <Comp field={field} defaultValue={doc?.[field.slug]} />
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      );
    default:
      return (
        <div className="p-4">
          <Card>
            <DataTable<{ _id: string }, any>
              isLoading={isLoading}
              rowWrapper={DocumentProvider}
              columns={filteredSchema.map((field) => {
                const Comp =
                  FIELDS[field?.type || "TEXT"]?.["default"] || (() => <></>);

                const textAlignClass = ["CURRENCY", "NUMBER"].includes(
                  field?.type || ""
                )
                  ? "text-right"
                  : "text-left";

                const columnId =
                  field.type === "DOCUMENT" ? `${field.slug}_full` : field.slug;

                return {
                  accessorKey: columnId,
                  header: () => (
                    <div className={textAlignClass}>
                      {field?.label || field.slug}
                    </div>
                  ),
                  cell: ({ row }) => {
                    return (
                      <div className={textAlignClass}>
                        <Comp
                          field={field}
                          defaultValue={row.getValue(columnId)}
                        />
                      </div>
                    );
                  },
                };
              })}
              data={result.docs}
              onClickRow={(doc) => {
                navigate(
                  `/c/${slug}/v/${view?.slug || "base"}/d/show/${doc._id}`
                );
              }}
            />
          </Card>
        </div>
      );
  }
}
