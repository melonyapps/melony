import { zodResolver } from "@hookform/resolvers/zod";
import { useCollection, useDocument } from "@melony/core/react";
import { Form } from "@melony/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormFields } from "./form/form-fields";
import { Button } from "@melony/ui/button";
import { getValidation } from "../helpers/validate";
import { Card } from "@melony/ui/card";
import { filterEditableFields } from "../helpers/filter-editable-fields";

export function DocumentForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}) {
  const { schema } = useCollection();
  const { data } = useDocument();

  const filteredSchema = filterEditableFields(schema);

  const schemaFields = filteredSchema.map((field) => {
    return [field.slug, getValidation(field)];
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
        className="space-y-4"
      >
        <Card>
          <FormFields schema={filteredSchema} />
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
