"use client";

import { DocumentProvider } from "@melony/core/react";
import {
  Between,
  DocumentDetails,
  DocumentHeading,
  DocumentSubcollections,
  Stack,
} from "@melony/views";
import { useParams } from "next/navigation";
import EditButton from "./edit-button";

export const metadata = {
  title: "Melony",
};

export default function PageContent() {
  const params = useParams();

  const documentId = params.id as string;

  return (
    <DocumentProvider id={documentId}>
      <Stack horizontal>
        <DocumentHeading />
        <Between />
        <EditButton />
      </Stack>

      <DocumentDetails />

      <DocumentSubcollections />
    </DocumentProvider>
  );
}
