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
import { Check } from "lucide-react";

export function DocumentForm({ onSuccess }: { onSuccess: () => void }) {
  const { schema, createDoc, updateDoc, isUpdatingDoc, isCreatingDoc } =
    useCollection();
  const { data: docData, isLoading } = useDocument();

  const filteredSchema = filterEditableFields(schema);

  const schemaFields = filteredSchema.map((field) => {
    return [field.slug, getValidation(field)];
  });

  const formSchema = z.object(Object.fromEntries(schemaFields));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: docData,
  });

  const handleSubmit = (inputData: any) => {
    if (docData?._id) {
      updateDoc(
        { id: docData?._id, data: inputData },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    } else {
      createDoc(inputData, {
        onSuccess: () => {
          onSuccess();
        },
      });
    }
  };

  if (isLoading) return <>Loading...</>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, (err) => console.log(err))}
        className="space-y-4"
      >
        <FormFields schema={filteredSchema} />

        <div className="flex justify-end">
          <Button type="submit" disabled={isCreatingDoc || isUpdatingDoc}>
            <Check className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
