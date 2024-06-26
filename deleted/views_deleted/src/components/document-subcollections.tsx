"use client";

import React from "react";
import { CollectionProvider, useCollection, useDocument } from "@melony/core";
import { DocumentFieldProps } from "@melony/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@melony/ui";
import { FilterOperator } from "@melony/core";
import { Stack } from "./stack";
import { SearchInput } from "./search-input";
import { Between } from "./between";
import { CreateButton } from "./create-button";
import { Table } from "./table";

export function DocumentSubcollections({}: {}): JSX.Element {
	const { slug: collectionSlug, schema } = useCollection();
	const { data, isLoading } = useDocument();

	if (isLoading) {
		return <></>;
	}

	// TODO: we need to auto-detect the type
	const subcollectionFields = schema.filter(
		(x) => x.type === "DOCUMENTS",
	) as DocumentFieldProps[];

	if (subcollectionFields.length === 0) return <></>;

	return (
		<Tabs
			defaultValue={subcollectionFields[0]?.slug}
			className="flex flex-col h-full overflow-hidden"
		>
			<TabsList>
				{subcollectionFields.map((colField) => {
					return (
						<TabsTrigger key={colField.slug} value={colField.slug}>
							{colField?.label || colField.slug}
						</TabsTrigger>
					);
				})}
			</TabsList>

			{subcollectionFields.map((colField) => {
				return (
					<TabsContent
						key={colField.slug}
						value={colField.slug}
						className="overflow-auto"
					>
						<CollectionProvider
							slug={colField.collectionSlug}
							viewSlug={colField?.defaultViewSlug}
							baseParams={{
								filter: [
									{
										field: colField?.foreignField || `${collectionSlug}_id`,
										operator: FilterOperator.Is,
										value: data?._id,
									},
								],
							}}
						>
							<div className="p-2 border-b">
								<Stack horizontal gapSize="sm">
									<SearchInput />
									<Between />
									<CreateButton />
								</Stack>
							</div>

							<div className="flex-1 overflow-auto">
								<Table />
							</div>
						</CollectionProvider>
					</TabsContent>
				);
			})}
		</Tabs>
	);
}
