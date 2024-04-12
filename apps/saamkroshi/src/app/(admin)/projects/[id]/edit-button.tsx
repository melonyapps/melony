"use client";

import { useDocument } from "@melony/core/react";
import { Button } from "@melony/views";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditButton() {
  const router = useRouter();
  const { data } = useDocument();

  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push(`/projects/edit/${data?._id}`);
      }}
    >
      <Pencil className="h-4 w-4 mr-2" /> Edit
    </Button>
  );
}
