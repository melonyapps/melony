import React from "react";
import { InputFieldProps } from "@melony/core/config";
import { FormControl } from "@melony/ui/form";
import { Input } from "@melony/ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function FormPassword({
  type,
  field,
}: {
  field: ControllerRenderProps<FieldValues, string>;
} & InputFieldProps) {
  return (
    <FormControl>
      <Input placeholder={""} {...field} type="password" />
    </FormControl>
  );
}
