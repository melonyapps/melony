"use client";

import { Table } from "@melony/views";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Next Melony",
};

export default function PageContent() {
  const router = useRouter();

  return (
    <Table
      onRowClick={(row) => {
        router.push(`/projects/${row._id}`);
      }}
    />
  );
}
