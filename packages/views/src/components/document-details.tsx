import React from "react";
import { useCollection, useDocument } from "@melony/core/react";
import { Card } from "@melony/ui/card";
import { FIELDS } from "../constants";
import { filterEditableFields } from "../helpers/filter-editable-fields";

export function DocumentDetails({}: {}): JSX.Element {
  const { data } = useDocument();

  const { schema } = useCollection();

  const filteredSchema = filterEditableFields(schema);

  return (
    <Card>
      <div className="flex flex-col divide-y">
        {filteredSchema.map((field) => {
          const Comp =
            FIELDS[field?.type || "TEXT"]?.["default"] || (() => <></>);

          const fieldId =
            field.type === "DOCUMENT" ? `${field.slug}_full` : field.slug;

          return (
            <div key={field.slug} className="grid grid-cols-12 py-2.5 gap-8">
              <div className="col-span-4 text-right truncate">
                <div className="text-muted-foreground block truncate">
                  {field?.label || field.slug}
                </div>
              </div>
              <div className="col-span-8">
                <Comp field={field} defaultValue={data?.[fieldId]} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
