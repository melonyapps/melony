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
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

export function FormNumber({
  field,
  fieldController,
}: {
  field: FieldProps;
  fieldController: ControllerRenderProps<FieldValues, string>;
}) {
  const { setValue } = useFormContext();

  return (
    <FormItem>
      <FormLabel>{field.title}</FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder={""}
          {...fieldController}
          onChange={(e) => {
            setValue(field.key, e.target.valueAsNumber);
          }}
        />
      </FormControl>
      {/* <FormDescription>This is your public display name.</FormDescription> */}
      <FormMessage />
    </FormItem>
  );
}
