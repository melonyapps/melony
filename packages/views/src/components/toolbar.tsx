import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@melony/ui/input";
import { Button } from "@melony/ui/button";
import { AdvancedFilterPopover } from "@melony/ui/advanced-filter-popover";
import { Plus } from "lucide-react";
import { SortingProps, useCollection, useView } from "@melony/core/react";
import { convertFieldsToFilterTokens } from "../helpers/transforms";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@melony/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@melony/ui/popover";

export function Toolbar() {
  const [sortIsOpen, setSortIsOpen] = React.useState(false);

  const navigate = useNavigate();
  const { data: viewData } = useView();
  const { slug, schema, params, filter, sort } = useCollection();

  return (
    <div className="py-4 px-4 h-[52px] flex justify-between items-center gap-2 border-b">
      <div className="h-[52px] flex items-center gap-2">
        {/* <div>
              <Button variant="secondary">Views</Button>
            </div>
            <div>
              <Button variant="secondary">Create</Button>
            </div> */}
        <div>
          <Input placeholder="Search by title..." />
        </div>

        <div>
          <AdvancedFilterPopover
            filterTokens={convertFieldsToFilterTokens(schema)}
            items={params?.filter || []}
            onChange={filter}
          />
        </div>
        <div>
          <Popover open={sortIsOpen} onOpenChange={setSortIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">Sort</Button>
            </PopoverTrigger>
            <PopoverContent className="p-2" align="start">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select
                    value={params?.sort?.field}
                    onValueChange={(value) =>
                      sort({
                        field: value,
                        direction: params?.sort?.direction || "desc",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="- Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
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
                <div>
                  <Select
                    value={params?.sort?.direction}
                    onValueChange={(value: SortingProps["direction"]) =>
                      sort({
                        field: params?.sort?.field || "unknown",
                        direction: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="- Dir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"asc"}>ASC</SelectItem>
                        <SelectItem value={"desc"}>DESC</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Button variant="ghost">Group</Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2"></div>

        <div>
          <Button
            onClick={() => {
              navigate(`/c/${slug}/v/${viewData?.slug || "base"}/d/create`);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Create
          </Button>
        </div>
      </div>
    </div>
  );
}
