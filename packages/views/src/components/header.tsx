import * as React from "react";

export function Header({
  title,
  toolbar,
}: {
  title: string;
  toolbar?: JSX.Element;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 h-[52px] border-b">
      <div className="text-lg">{title}</div>
      {toolbar}
    </div>
  );
}
