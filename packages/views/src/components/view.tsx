import * as React from "react";
import { useCollection } from "@melony/core/react";
import { Table } from "./table";
import { Cards } from "./cards";
import { Stack } from "./stack";
import { SearchInput } from "./search-input";
import { AdvancedFilter } from "./advanced-filter";
import { Sort } from "./sort";
import { Card, CardContent } from "@melony/ui/card";

export function View() {
	const { view } = useCollection();

	switch (view?.type) {
		case "CARDS":
			return <Cards />;
		default:
			return (
				<Card className="flex-1 flex flex-col overflow-hidden">
					<Stack horizontal gapSize="sm">
						<div className="px-3 py-2.5 flex gap-2 border-b w-full">
							<SearchInput />
							<AdvancedFilter />
							<Sort />
						</div>
					</Stack>

					<CardContent className="flex-1 overflow-auto p-0">
						<Table />
					</CardContent>
				</Card>
			);
	}
}
