"use client";

import { useParams } from "react-router-dom";
import { CollectionProvider } from "@melony/core";
import { Container } from "../components/container";
import { Table } from "../components/table";
import { PageContent } from "../components/page-content";
import { CollectionHeader } from "../components/collection-header";
import { SearchInput } from "../components/search-input";
import { AdvancedFilter } from "../components/advanced-filter";
import { Sort } from "../components/sort";

export function ListPage() {
	const params = useParams();

	return (
		<Container>
			<CollectionProvider slug={params?.collectionSlug || "unknown"}>
				<CollectionHeader />
				<PageContent>
					<div className="px-3 py-2.5 flex gap-2 border-b w-full">
						<SearchInput />
						<AdvancedFilter />
						<Sort />
					</div>
					<Table />
				</PageContent>
			</CollectionProvider>
		</Container>
	);
}
