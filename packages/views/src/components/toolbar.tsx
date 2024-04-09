import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@melony/ui/input";
import { Button } from "@melony/ui/button";
import { AdvancedFilterPopover } from "@melony/ui/advanced-filter-popover";
import { Plus } from "lucide-react";
import { useCollection, useView } from "@melony/core/react";
import { convertFieldsToFilterTokens } from "../helpers/transforms";

export function Toolbar() {
  const navigate = useNavigate();
  const { data: viewData } = useView();
  const { slug, schema, params, filter } = useCollection();

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
          <Button variant="ghost">Sort</Button>
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
