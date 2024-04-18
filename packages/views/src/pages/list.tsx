import * as React from "react";
import { Header } from "../components/header";
import { View } from "../components/view";
import { useCollection } from "@melony/core/react";
import { Toolbar } from "../components/toolbar";

export function ListPage() {
  const { data: collectionData, view } = useCollection();

  return (
    <div className="flex flex-col h-full">
      <Header title={view?.label || collectionData?.label || ""} />
      <Toolbar />

      <div className="h-full overflow-auto">
        <View />
      </div>
    </div>
  );
}
