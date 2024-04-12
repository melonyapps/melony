"use client";

import { DocumentProvider } from "@melony/core/react";
import { DocumentForm } from "@melony/views";
import { useParams, useRouter } from "next/navigation";

export const metadata = {
  title: "Create",
};

export default function PageContent() {
  const router = useRouter();
  const params = useParams();

  const documentId = params.id as string;

  return (
    <DocumentProvider id={params.id}>
      <DocumentForm
        onSuccess={() => {
          router.push("/projects");
        }}
      />
    </DocumentProvider>
  );
}
