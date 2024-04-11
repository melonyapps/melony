import * as React from "react";
import { Heading } from "./heading";

export function Header({
  title,
  toolbar,
}: {
  title: string;
  toolbar?: JSX.Element;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Heading>{title}</Heading>
      {toolbar}
    </div>
  );
}
