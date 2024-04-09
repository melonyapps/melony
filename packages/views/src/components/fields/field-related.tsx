import * as React from "react";
import { FieldProps, useDocument } from "@melony/core/react";
import { Badge } from "@melony/ui/badge";

export const FieldRelated = ({ field }: { field: FieldProps }) => {
  const { data } = useDocument();

  const value = data?.[field.key] || [];

  return (
    <div className="flex items-center gap-1">
      {value.map((item: any) => (
        <Badge key={item._id} variant="outline">
          {item?.title}
        </Badge>
      ))}
    </div>
  );
};
