import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@melony/ui/button";
import { Plus } from "lucide-react";
import { SortingProps, useCollection } from "@melony/core/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@melony/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@melony/ui/popover";
import { AdvancedFilter } from "./advanced-filter";
import { SearchInput } from "./search-input";
import { Sort } from "./sort";

export function Toolbar(props: { small?: boolean }) {
  const { small } = props;

  const [sortIsOpen, setSortIsOpen] = React.useState(false);

  const navigate = useNavigate();
  const { slug, schema, params, sort, view } = useCollection();

  if (small) {
    return (
      <div className="py-4 px-4 h-[52px] flex justify-between items-center gap-2">
        <div className="h-[52px] flex items-center gap-2">
          <SearchInput />
        </div>

        <div>
          <Button
            onClick={() => {
              navigate(`/c/${slug}/v/${view?.slug || "base"}/d/create`);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Create
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 px-4 h-[52px] flex justify-between items-center gap-2">
      <div className="h-[52px] flex items-center gap-2">
        {/* <div>
              <Button variant="secondary">Views</Button>
            </div>
            <div>
              <Button variant="secondary">Create</Button>
            </div> */}
        <div>
          <SearchInput />
        </div>

        <div>
          <AdvancedFilter />
        </div>
        <div>
          <Sort />
        </div>
        {/* <div>
          <Button variant="ghost">Group</Button>
        </div> */}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2"></div>

        <div>
          <Button
            onClick={() => {
              navigate(`/c/${slug}/v/${view?.slug || "base"}/d/create`);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Create
          </Button>
        </div>
      </div>
    </div>
  );
}
