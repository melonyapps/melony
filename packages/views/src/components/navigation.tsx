"use client";

import React from "react";
import { useConfig } from "@melony/core/react";
import { cn } from "@melony/ui/lib";
import { NavigationItemProps } from "@melony/core/config";
import * as icons from "lucide-react";

export function Navigation({
  pathname = "",
  onClickItem,
}: {
  pathname?: string;
  onClickItem: (item: NavigationItemProps) => void;
}) {
  const { config } = useConfig();

  const collections = config?.collections || [];

  const ViewsFlatten: NavigationItemProps[] = [];

  // TODO: keeping reduce here for nested navigation if needed
  const Views = collections.reduce(
    (prev, curr) => {
      if (curr?.views) {
        prev[curr?.label || curr.slug] = (curr?.views || []).map((view) => {
          const viewItem = {
            title: view?.label || view.slug,
            to: `/c/${curr.slug}/v/${view.slug}`,
            icon: view?.icon || "Eye",
          };

          ViewsFlatten.push(viewItem);

          return viewItem;
        });
      }

      return prev;
    },
    {} as Record<string, NavigationItemProps[]>
  );

  const defaultNav: Record<string, NavigationItemProps[]> = {};

  if (ViewsFlatten.length > 0) {
    defaultNav["Views"] = ViewsFlatten;
  }

  if (collections.length > 0) {
    defaultNav["Collections"] = collections.map((collection) => ({
      title: collection?.label || collection.slug,
      to: `/c/${collection.slug}/v/base`,
      icon: "Folder",
    }));
  }

  const nav = config?.ui?.navigation || defaultNav;

  console.log(pathname);

  return (
    <div className="flex flex-col gap-2">
      {Object.keys(nav).map((title) => {
        return (
          <div key={title}>
            <div className="text-xs opacity-60 p-2.5">{title}</div>

            <nav className="flex flex-col gap-0.5">
              {(nav?.[title] || []).map((item) => {
                const Icon = icons[item?.icon || "Folder"];

                return (
                  <div
                    key={item.to}
                    className={cn(
                      "cursor-pointer inline-flex items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start",
                      {
                        "text-accent-foreground bg-muted": pathname.includes(
                          item.to
                        ),
                      }
                    )}
                    onClick={() => {
                      onClickItem(item);
                    }}
                  >
                    <Icon className="h-5 w-5 mr-2.5" />
                    <span className="block truncate">{item?.title}</span>
                  </div>
                );
              })}
            </nav>
          </div>
        );
      })}
    </div>
  );
}
