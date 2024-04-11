import React from "react";
import {
  DocumentProvider,
  useCollection,
  useGetDocument,
} from "@melony/core/react";
import { Button } from "@melony/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@melony/ui/tabs";
import { Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/header";
import { Card } from "@melony/ui/card";
import { CollectionWrapper } from "../components/collection-wrapper";
import { Content } from "../components/content";
import { DocumentFieldProps } from "@melony/core/config";
import { FIELDS } from "../constants";
import { DocumentDropdownMenu } from "../components/document-dropdown-menu";
import { filterEditableFields } from "../helpers/filter-editable-fields";
import { FilterOperator } from "@melony/core/filter";
import { Toolbar } from "../components/toolbar";

export function ShowPage({}: {}): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const documentId = params?.documentId || "";

  const { slug: collectionSlug, schema, view } = useCollection();

  const { data: docRes, isLoading } = useGetDocument(
    collectionSlug,
    documentId
  );

  if (isLoading) return <>Loading doc...</>;

  // TODO: we need to auto-detect the type
  const subcollectionFields: DocumentFieldProps[] = schema.filter(
    (x) => x.type === "DOCUMENTS"
  );

  const filteredSchema = filterEditableFields(schema);

  return (
    <DocumentProvider data={docRes?.data}>
      <Header
        title={docRes?.data?.title || ""}
        toolbar={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                navigate(
                  `/c/${collectionSlug}/v/${view?.slug || "base"}/d/edit/${documentId}`
                );
              }}
            >
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </Button>

            <DocumentDropdownMenu docId={documentId} />
          </div>
        }
      />

      <div className="flex flex-col gap-4 h-full">
        <div className="p-4 flex flex-col gap-4">
          <Card>
            {/* <CardHeader>Details</CardHeader> */}
            {/* <CardContent> */}
            <div className="flex flex-col divide-y">
              {filteredSchema.map((field) => {
                const Comp =
                  FIELDS[field?.type || "TEXT"]?.["default"] || (() => <></>);

                const fieldId =
                  field.type === "DOCUMENT" ? `${field.slug}_full` : field.slug;

                return (
                  <div
                    key={field.slug}
                    className="grid grid-cols-12 py-2.5 gap-8"
                  >
                    <div className="col-span-4 text-right truncate">
                      <div className="text-sm text-muted-foreground block truncate">
                        {field?.label || field.slug}
                      </div>
                    </div>
                    <div className="col-span-8">
                      <Comp
                        field={field}
                        defaultValue={docRes?.data?.[fieldId]}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* </CardContent> */}
          </Card>
        </div>

        {subcollectionFields.length > 0 && (
          <Tabs defaultValue={subcollectionFields[0]?.slug}>
            <div className="px-4">
              <TabsList>
                {subcollectionFields.map((colField) => {
                  return (
                    <TabsTrigger key={colField.slug} value={colField.slug}>
                      {colField?.label || colField.slug}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {subcollectionFields.map((colField) => {
              return (
                <TabsContent key={colField.slug} value={colField.slug}>
                  <CollectionWrapper
                    collectionSlug={colField.collectionSlug}
                    viewSlug={colField?.defaultViewSlug}
                    baseParams={{
                      filter: [
                        {
                          field:
                            colField?.foreignField || `${collectionSlug}_id`,
                          operator: FilterOperator.Is,
                          value: docRes?.data?._id,
                        },
                      ],
                    }}
                  >
                    <Toolbar small />
                    <Content />
                  </CollectionWrapper>
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </div>
    </DocumentProvider>
  );
}
