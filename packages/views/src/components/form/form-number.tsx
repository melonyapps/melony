import React from "react";
import { FormControl } from "@melony/ui/form";
import { Input } from "@melony/ui/input";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { InputFieldProps } from "@melony/core/config";

export function FormNumber({
  field,
  fieldController,
}: {
  field: InputFieldProps;
  fieldController: ControllerRenderProps<FieldValues, string>;
}) {
  const { setValue } = useFormContext();

  return (
    <FormControl>
      <Input
        type="number"
        placeholder={""}
        {...fieldController}
        onChange={(e) => {
          setValue(field.slug, e.target.valueAsNumber);
        }}
      />
    </FormControl>
  );
}
