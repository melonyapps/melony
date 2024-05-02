"use client";

import React from "react";
import { useSuggestions } from "@melony/core/react";
import { FormControl } from "@melony/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@melony/ui/popover";
import { Button } from "@melony/ui/button";
import { cn } from "@melony/ui/lib";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@melony/ui/command";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { DocumentFieldProps } from "@melony/core/config";

interface IOption {
  label: string;
  value: string;
}

export function FormCombobox({
  field,
  collectionSlug,
  label,
}: {
  field: ControllerRenderProps<FieldValues, string>;
} & DocumentFieldProps) {
  const { setValue } = useFormContext();
  const [open, setOpen] = React.useState(false);

  const {
    data: suggestions = {
      docs: [],
      meta: { currentCollection: { fields: [] } },
    },
    isLoading,
  } = useSuggestions({
    collectionSlug,
  });

  const options: IOption[] = suggestions.docs.map(
    (x: { _id: string; title: string }) => ({
      label: x.title,
      value: x._id,
    })
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[280px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            <span className="block truncate">
              {field.value
                ? options.find((option) => option.value === field.value)?.label
                : "- Select"}
            </span>

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command label={label}>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>{isLoading ? "Loading..." : "Empty."}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(val) => {
                    setValue(field.name, val);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
