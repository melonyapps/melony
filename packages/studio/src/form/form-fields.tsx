import React from "react";
import { DocContext, FieldProps } from "@melony/core";
import { FormInput } from "./form-input";
import { FormDate } from "./form-date";
import { FormCombobox } from "./form-combobox";
import { FormField } from "@melony/ui/form";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { FormNumber } from "./form-number";

export function DocumentProvider({
  children,
  data,
}: {
  children: JSX.Element | JSX.Element[];
  data: any;
}) {
  const value = { data };

  return <DocContext.Provider value={value}>{children}</DocContext.Provider>;
}

export function FormFields({ fields }: { fields: FieldProps[] }) {
  const { control } = useFormContext();

  const renderFormField = (
    fieldItem: FieldProps,
    fieldController: ControllerRenderProps<FieldValues, string>
  ) => {
    const fieldProps = {
      field: fieldItem,
      fieldController,
    };

    switch (fieldItem.type) {
      case "TEXT":
        return <FormInput {...fieldProps} />;
      case "DOCUMENT":
        return <FormCombobox {...fieldProps} />;
      case "DATE":
        return <FormDate {...fieldProps} />;
      case "NUMBER":
        return <FormNumber {...fieldProps} />;
      case "CURRENCY":
        return <FormNumber {...fieldProps} />;
      default:
        return <FormInput {...fieldProps} />;
    }
  };

  return (
    <>
      {fields.map((fieldItem) => (
        <div key={fieldItem.key}>
          <FormField
            key={fieldItem.key}
            control={control}
            name={fieldItem.key}
            render={({ field }) => {
              return renderFormField(fieldItem, field) || <></>;
            }}
          />
        </div>
      ))}
    </>
  );
}
