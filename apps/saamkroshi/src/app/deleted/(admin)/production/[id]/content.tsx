"use client";

import { DocumentProvider } from "@melony/core/react";
import { DocumentDetails, DocumentHeading } from "@melony/views";
import { useParams } from "next/navigation";

export const metadata = {
  title: "Melony",
};

export default function PageContent() {
  const params = useParams();

  return (
    <DocumentProvider id={params.id}>
      <DocumentHeading />
      <DocumentDetails />
    </DocumentProvider>
  );
}
