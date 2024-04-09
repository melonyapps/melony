import * as React from "react";
import { FieldProps } from "@melony/core/react";

export const FieldText = ({
  field,
  defaultValue,
}: {
  field: FieldProps;
  defaultValue: any;
}) => {
  return <span className="block truncate">{defaultValue || "-"}</span>;
};
