"use client";

import { DocumentForm } from "@melony/views";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Create",
};

export default function PageContent() {
  const router = useRouter();

  return (
    <DocumentForm
      onSuccess={() => {
        router.push("/projects");
      }}
    />
  );
}
