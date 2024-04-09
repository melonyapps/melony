import * as React from "react";
import { Badge } from "@melony/ui/badge";
import { DocumentFieldProps } from "@melony/core/config";

export const FieldDocument = ({
  field,
  defaultValue,
}: {
  field: DocumentFieldProps;
  defaultValue: any;
}) => {
  if (!defaultValue) return <></>;

  return (
    <Badge
      variant="secondary"
      color={defaultValue?.[field.colorField || "color"]}
    >
      {defaultValue?.title}
    </Badge>
  );
};
