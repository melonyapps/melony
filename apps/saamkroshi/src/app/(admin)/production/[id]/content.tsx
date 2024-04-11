"use client";

import { DocumentProvider } from "@melony/core/react";
import { DocumentDetails, DocumentHeader } from "@melony/views";
import { useParams, useRouter } from "next/navigation";

export const metadata = {
  title: "Next Melony",
};

export default function PageContent() {
  const router = useRouter();
  const params = useParams();

  return (
    <DocumentProvider id={params.id}>
      <DocumentHeader />
      <DocumentDetails />
    </DocumentProvider>
  );
}
