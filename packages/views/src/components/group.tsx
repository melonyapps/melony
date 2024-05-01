"use client";

import * as React from "react";
import { Button } from "@melony/ui/button";
import { useCollection } from "@melony/core/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@melony/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@melony/ui/popover";

export function Group() {
  const [isOpen, setIsOpen] = React.useState(false);

  const { schema, params, group } = useCollection();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Group</Button>
      </PopoverTrigger>
      <PopoverContent className="p-2" align="start">
        <div className="flex gap-2">
          <div className="flex-1">
            <Select
              value={params?.group?.field}
              onValueChange={(value) =>
                group({
                  field: value,
                  orientation: "vertical",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="- Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"none"}>none</SelectItem>

                  {schema.map((field) => {
                    return (
                      <SelectItem key={field.slug} value={field.slug}>
                        {field?.label || field.slug}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
