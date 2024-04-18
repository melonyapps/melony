import * as React from "react";
import { useCollection } from "@melony/core/react";
import { Table } from "./table";
import { Cards } from "./cards";

export function View() {
  const { view } = useCollection();

  switch (view?.type) {
    case "CARDS":
      return <Cards />;
    default:
      return <Table />;
  }
}
