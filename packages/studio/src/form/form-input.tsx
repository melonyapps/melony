import React from "react";
import { FieldProps } from "@melony/core";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@melony/ui/form";
import { Input } from "@melony/ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function FormInput({
  field,
  type,
  fieldController,
}: {
  field: FieldProps;
  type?: React.HTMLInputTypeAttribute;
  fieldController: ControllerRenderProps<FieldValues, string>;
}) {
  return (
    <FormItem>
      <FormLabel>{field.title}</FormLabel>
      <FormControl>
        <Input placeholder={""} {...fieldController} type={type} />
      </FormControl>
      {/* <FormDescription>This is your public display name.</FormDescription> */}
      <FormMessage />
    </FormItem>
  );
}
