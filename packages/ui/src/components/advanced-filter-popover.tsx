import React from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Trash } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export enum FilterOperator {
  Is = "is",
  Contains = "contains",
  DoesNotContain = "does not contain",
  IsAnyOf = "is any of",
  GeoWithinBox = "geo within box",
}

export type FilterItem = {
  field: string;
  operator: FilterOperator;
  value: any;
};

export type FilterTokenProps = {
  isDefault?: boolean;
  defaultOperator?: FilterOperator;
  availableOperators?: FilterOperator[];
  field: { label?: string; slug: string; type: string };
};

export type AdvancedFilterPopoverProps = {
  defaultOpen?: boolean;
  filterTokens: FilterTokenProps[];
  items: FilterItem[];
  onChange: (items: FilterItem[]) => void;
};

export function AdvancedFilterPopover({
  defaultOpen,
  filterTokens,
  items,
  onChange,
}: AdvancedFilterPopoverProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  const defaultField =
    filterTokens.find((field) => field.isDefault) || filterTokens[0];

  const handleAddFilter = () => {
    const newItems = [...items];
    newItems.push({
      field: defaultField?.field?.slug || "",
      operator: defaultField?.defaultOperator || FilterOperator["Contains"],
      value: "",
    });
    onChange(newItems);
  };

  const handleFilterChange = (idx: number, value: FilterItem) => {
    const newValues = [...items];
    newValues[idx] = value;
    onChange([...newValues]);
  };

  const handleRemoveItem = (idx: number) => {
    const newValues = [...items]; // it is important to create a new array with {...} to act properly
    newValues.splice(idx, 1);
    onChange(newValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          Filter{" "}
          {items.length > 0 && <Badge className="ml-2">{items.length}</Badge>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        {items.length === 0 && (
          <p className="text-sm text-muted p-4">No filters are applied.</p>
        )}

        <div className="space-y-2 p-4">
          {items.map((item, i) => (
            <AdvancedFilterItem
              key={i}
              filterTokens={filterTokens}
              value={item}
              onChange={(val) => {
                handleFilterChange(i, val);
              }}
              onRemove={() => {
                handleRemoveItem(i);
              }}
            />
          ))}
        </div>

        <div className="p-3">
          <Button onClick={handleAddFilter} variant="outline" size="sm">
            Add filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

type FilterItemProps = {
  value: FilterItem;
  filterTokens: FilterTokenProps[];
  onChange: (value: FilterItem) => void;
  onRemove: () => void;
  useSuggestions?: any;
  useGetMembers?: any;
  projectId?: string;
};

export function AdvancedFilterItem(props: FilterItemProps) {
  const { onChange, filterTokens, onRemove, value } = props;

  const splittedField = value.field.split("."); // if there is like task.id split and use just a task
  const currentField = filterTokens.find(
    (x) => x.field.slug === splittedField[0]
  );

  const handleChangeField = (field: string) => {
    let val = value.value;

    // TODO: we need to set checkbox to false by default
    if (currentField?.field?.type === "CHECKBOX") {
      val = false;
    }

    onChange({
      ...value,
      field,
      value: val,
    });
  };

  const handleValueChange = (field: string, val: any) => {
    onChange({
      ...value,
      field,
      value: val,
    });
  };

  const handleChangeOperator = (operator: FilterOperator) => {
    onChange({
      ...value,
      operator,
    });
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-36">
        <Select
          value={currentField?.field.slug}
          onValueChange={(value) => handleChangeField(value)}
        >
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder="pl" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filterTokens.map((token) => {
                return (
                  <SelectItem key={token.field.slug} value={token.field.slug}>
                    {token.field?.label || token.field?.slug}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-24">
        <Select
          value={value.operator}
          onValueChange={(value) => handleChangeOperator(value)}
        >
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder="pl" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {(
                currentField?.availableOperators || [FilterOperator.Contains]
              ).map((operator) => {
                return (
                  <SelectItem key={operator} value={operator}>
                    {operator}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          onChange={(e) => {
            handleValueChange(value.field, e.target.value);
          }}
        />
      </div>

      <Button onClick={() => onRemove()} variant="ghost">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
