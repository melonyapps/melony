"use client";

import * as React from "react";
import { Button } from "@melony/ui/button";
import { Plus } from "lucide-react";
import { useCollection } from "@melony/core/react";

export function CreateButton() {
  const { slug, view } = useCollection();

  return (
    <Button
      onClick={() => {
        // navigate(`/c/${slug}/v/${view?.slug || "base"}/d/create`);
      }}
    >
      <Plus className="h-4 w-4 mr-2" /> Create
    </Button>
  );
}
