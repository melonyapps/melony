import * as React from "react";
import { Header } from "../components/header";
import { Content } from "../components/content";
import { useCollection, useView } from "@melony/core/react";
import { Toolbar } from "../components/toolbar";

export function ListPage() {
  const { data: viewData } = useView();
  const { data: collectionData } = useCollection();

  return (
    <div className="flex flex-col h-full">
      <Header title={viewData?.label || collectionData?.label || ""} />
      <Toolbar />

      <div className="h-full overflow-auto">
        <Content />
      </div>
    </div>
  );
}
