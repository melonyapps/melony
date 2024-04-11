"use client";

import * as React from "react";
import { DocumentProvider, useCollection } from "@melony/core/react";
import { DataTable } from "@melony/ui/data-table";
import { FIELDS } from "../constants";
import { Card } from "@melony/ui/card";
import { filterEditableFields } from "../helpers/filter-editable-fields";

export function Table({
  onRowClick,
}: {
  onRowClick: (row: { _id: string }) => void;
}) {
  const { isLoading, schema, result } = useCollection();

  const filteredSchema = filterEditableFields(schema);

  return (
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
              <div className={textAlignClass}>{field?.label || field.slug}</div>
            ),
            cell: ({ row }) => {
              return (
                <div className={textAlignClass}>
                  <Comp field={field} defaultValue={row.getValue(columnId)} />
                </div>
              );
            },
          };
        })}
        data={result.docs}
        onClickRow={(doc) => {
          onRowClick(doc);
        }}
      />
    </Card>
  );
}
