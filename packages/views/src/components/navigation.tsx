import React from "react";
import { useConfig } from "@melony/core/react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@melony/ui/lib";
import { Eye, Folder, Rocket } from "lucide-react";
import { NavigationItemProps } from "@melony/core/config";

export function Navigation() {
  const location = useLocation();
  const { config } = useConfig();

  const Views = config.collections.reduce(
    (prev, curr) => {
      if (curr?.views) {
        prev[curr?.label || curr.slug] = (curr?.views || []).map((view) => {
          return {
            title: view?.label || view.slug,
            to: `/c/${curr.slug}/v/${view.slug}`,
            icon: <Eye className="h-4 w-4" />,
          };
        });
      }

      return prev;
    },
    {} as Record<string, NavigationItemProps[]>
  );

  const defaultNav: Record<string, NavigationItemProps[]> = {
    ...Views,
    Collections: config.collections.map((collection) => ({
      title: collection?.label || collection.slug,
      to: `/c/${collection.slug}/v/base`,
      icon: <Folder className="h-4 w-4" />,
    })),
    Triggers: (config?.triggers || []).map((trigger) => ({
      title: trigger?.label || trigger.slug,
      to: `/c/${trigger?.collectionSlug}/t/${trigger.slug}`,
      icon: <Rocket className="h-4 w-4" />,
    })),
  };

  const nav = config?.ui?.navigation || defaultNav;

  return (
    <div className="flex flex-col gap-2">
      {Object.keys(nav).map((title) => {
        return (
          <div key={title}>
            <div className="text-xs opacity-60 p-2.5">{title}</div>

            <nav className="flex flex-col gap-0.5">
              {(nav?.[title] || []).map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start",
                    {
                      "text-accent-foreground bg-muted":
                        location.pathname.includes(item.to),
                    }
                  )}
                >
                  <span className="mr-2">{item?.icon}</span>
                  <span className="block truncate">{item?.title}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        );
      })}
    </div>
  );
}
