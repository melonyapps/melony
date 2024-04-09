import React from "react";
import {
  DocContext,
  FieldProps,
  useCollection,
  useDocument,
} from "@melony/core";
import { Form } from "@melony/ui/form";
import { Button } from "@melony/ui/button";
import { useForm } from "react-hook-form";
import z, { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields } from "./form/form-fields";

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

export function DocumentForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { fields } = useCollection();
  const { data } = useDocument();

  const filteredFields = fields.filter((x) => x.type !== "RELATED");

  const schemaFields = filteredFields.map((field) => {
    switch (field.type) {
      case "NUMBER":
        return [field.key, z.number()];
      case "CURRENCY":
        return [field.key, z.number()];
      case "DATE":
        return [field.key, z.date()];
      default:
        return [field.key, z.string()];
    }
  });

  const formSchema = z.object(Object.fromEntries(schemaFields));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        className="space-y-8"
      >
        <FormFields fields={filteredFields} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
