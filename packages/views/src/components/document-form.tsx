"use client";

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
import { useMelonyNavigate } from "../hooks/use-melony-navigate";

export function DocumentForm() {
  const navigate = useMelonyNavigate();
  const {
    slug,
    view,
    schema,
    createDoc,
    updateDoc,
    isUpdatingDoc,
    isCreatingDoc,
  } = useCollection();
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
            navigate(`/c/${slug}/v/${view?.slug || "base"}`);
          },
        }
      );
    } else {
      createDoc(inputData, {
        onSuccess: () => {
          // onSuccess();
          navigate(`/c/${slug}/v/${view?.slug || "base"}`);
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
        {/* <Card> */}
          <FormFields schema={filteredSchema} />
        {/* </Card> */}

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
