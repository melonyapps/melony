"use client";

import * as React from "react";
import { Button } from "@melony/ui/button";
import { Pencil } from "lucide-react";
import { useCollection, useDocument } from "@melony/core/react";
import { useMelonyNavigate } from "../hooks/use-melony-navigate";

export function EditButton() {
  const navigate = useMelonyNavigate();
  const { slug, view } = useCollection();
  const { data } = useDocument();

  return (
    <Button
      variant="outline"
      onClick={() => {
        navigate(`/c/${slug}/v/${view?.slug || "base"}/d/edit/${data._id}`);
      }}
    >
      <Pencil className="h-4 w-4 mr-2" /> Edit
    </Button>
  );
}
