"use client";

import { Input } from "@melony/ui/input";
import { useCollection } from "@melony/core/react";

export function SearchInput() {
  const { search } = useCollection();

  return (
    <div>
      <Input
        placeholder="Search by title..."
        onChange={(e) => {
          search(e.target.value);
        }}
      />
    </div>
  );
}
