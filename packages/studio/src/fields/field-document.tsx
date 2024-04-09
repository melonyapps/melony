import * as React from "react";
import { FieldProps, useDocument } from "@melony/core";
import { Badge } from "@melony/ui/badge";

export const FieldDocument = ({ field }: { field: FieldProps }) => {
  const { data } = useDocument();

  const value = data?.[field.key];

  return (
    <Badge variant="secondary" color={value?.[field.params?.colorFieldKey || ""]}>
      {value?.title}
    </Badge>
  );
};
