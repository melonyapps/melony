import * as React from "react";
import { FieldProps, useDocument } from "@melony/core/react";
import { formatDate, formatDateTime } from "@melony/ui/lib";

export const FieldDate = ({ field }: { field: FieldProps }) => {
  const { data } = useDocument();

  const value = data?.[field.key];

  return (
    <span className="block truncate">
      {value
        ? field?.params?.hasTime
          ? formatDateTime(value)
          : formatDate(value)
        : "-"}
    </span>
  );
};
