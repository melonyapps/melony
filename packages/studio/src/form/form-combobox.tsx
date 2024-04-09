import React from "react";
import { FieldProps, useSuggestions } from "@melony/core";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@melony/ui/form";
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

interface IOption {
  label: string;
  value: string;
}

export function FormCombobox({
  field,
  fieldController,
}: {
  field: FieldProps;
  fieldController: ControllerRenderProps<FieldValues, string>;
}) {
  const { setValue } = useFormContext();
  const [open, setOpen] = React.useState(false);

  const {
    data: suggestions = {
      docs: [],
      meta: { currentCollection: { fields: [] } },
    },
    refetch,
    isLoading,
  } = useSuggestions({
    collectionSlug: field?.params?.collectionSlug || "",
  });

  const options: IOption[] = suggestions.docs.map(
    (x: { _id: string; title: string }) => ({
      label: x.title,
      value: x._id,
    })
  );

  return (
    <FormItem className="flex flex-col gap-1">
      <FormLabel>{field.title}</FormLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[280px] justify-between",
                !fieldController.value && "text-muted-foreground"
              )}
            >
              <span className="block truncate">
                {fieldController.value
                  ? options.find(
                      (option) => option.value === fieldController.value
                    )?.label
                  : "- Select"}
              </span>

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command label={field.title}>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>{isLoading ? "Loading..." : "Empty."}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(val) => {
                      setValue(field.key, val);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        option.value === fieldController.value
                          ? "opacity-100"
                          : "opacity-0"
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

      {/* <FormDescription>
          This is your public display name.
        </FormDescription> */}
      <FormMessage />
    </FormItem>
  );
}
