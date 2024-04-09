import * as React from "react";
import { FieldProps, useDocument } from "@melony/core";
import { Avatar, AvatarFallback, AvatarImage } from "@melony/ui/avatar";

export const FieldUser = ({ field }: { field: FieldProps }) => {
  const { data } = useDocument();

  const value = data?.[field.key];

  return (
    <div className="flex items-center gap-2 min-w-[22px]">
      <div className="w-6 flex items-center">
        <Avatar className="h-6 w-6 mr-2">
          <AvatarImage src={value?.data?.image} alt={value?.title} />
          <AvatarFallback>
            {(value?.title || "").slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <span className="block truncate">{value?.title}</span>
    </div>
  );
};
