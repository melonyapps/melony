"use client";

import { cn } from "@melony/ui/lib";

export function Navigation({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function NavigationItem({
  title,
  active,
  onClick,
  icon,
}: {
  title?: string;
  active?: boolean;
  onClick?: () => void;
  icon?: JSX.Element;
}) {
  return (
    <div
      className={cn(
        "relative cursor-pointer inline-flex overflow-hidden items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start",
        {
          "text-accent-foreground bg-muted": active,
        }
      )}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {active && (
        <div className="absolute w-[4px] h-full bg-primary left-0 rounded-l-md"></div>
      )}
      {icon && icon}
      <span className="block truncate">{title}</span>
    </div>
  );
}
