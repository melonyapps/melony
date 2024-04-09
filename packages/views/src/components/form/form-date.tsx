import React from "react";
import { FieldProps } from "@melony/core/react";
import { FormControl } from "@melony/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@melony/ui/popover";
import { Button } from "@melony/ui/button";
import { cn } from "@melony/ui/lib";
import { Calendar } from "@melony/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function FormDate({
  field,
  fieldController,
}: {
  field: FieldProps;
  fieldController: ControllerRenderProps<FieldValues, string>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !fieldController.value && "text-muted-foreground"
            )}
          >
            {fieldController.value ? (
              format(fieldController.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={fieldController.value}
          onSelect={(e) => {
            fieldController.onChange(e);
            setOpen(false);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
