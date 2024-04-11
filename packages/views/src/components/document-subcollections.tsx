"use client";

import React from "react";
import { useCollection, useDocument } from "@melony/core/react";
import { DocumentFieldProps } from "@melony/core/config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@melony/ui/tabs";
import { CollectionWrapper } from "./collection-wrapper";
import { FilterOperator } from "@melony/core/filter";
import { Stack } from "./stack";
import { SearchInput } from "./search-input";
import { Between } from "./between";
import { CreateButton } from "./create-button";
import { Table } from "./table";

export function DocumentSubcollections({}: {}): JSX.Element {
  const { slug: collectionSlug, schema } = useCollection();
  const { data } = useDocument();

  // TODO: we need to auto-detect the type
  const subcollectionFields: DocumentFieldProps[] = schema.filter(
    (x) => x.type === "DOCUMENTS"
  );

  return (
    <Tabs defaultValue={subcollectionFields[0]?.slug}>
      <TabsList>
        {subcollectionFields.map((colField) => {
          return (
            <TabsTrigger key={colField.slug} value={colField.slug}>
              {colField?.label || colField.slug}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {subcollectionFields.map((colField) => {
        return (
          <TabsContent key={colField.slug} value={colField.slug}>
            <CollectionWrapper
              collectionSlug={colField.collectionSlug}
              viewSlug={colField?.defaultViewSlug}
              baseParams={{
                filter: [
                  {
                    field: colField?.foreignField || `${collectionSlug}_id`,
                    operator: FilterOperator.Is,
                    value: data?._id,
                  },
                ],
              }}
            >
              <Stack>
                <Stack horizontal gapSize="sm">
                  <SearchInput />
                  <Between />
                  <CreateButton />
                </Stack>
                <Table />
              </Stack>
            </CollectionWrapper>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
