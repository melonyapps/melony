"use client";

import { Card } from "@melony/ui";
import { DocumentDetails } from "./document-details";
import { DocumentSubcollections } from "./document-subcollections";
import { useCollection } from "@melony/core";
import { cn } from "@melony/ui";
import { DocumentFieldProps } from "@melony/core";

type DocumentContentProps = {};

export function DocumentContent({}: DocumentContentProps) {
	const { schema } = useCollection();

	// TODO: we need to auto-detect the type
	const subcollectionFields: DocumentFieldProps[] = schema.filter(
		(x) => x.type === "DOCUMENTS",
	);

	return (
		<Card className="flex-1 grid grid-cols-12 overflow-hidden">
			<div
				className={cn("col-span-4 bg-muted/20 border-r", {
					"col-span-12": subcollectionFields.length === 0,
				})}
			>
				<DocumentDetails />
			</div>
			{subcollectionFields.length != 0 && (
				<div className={cn("col-span-8 overflow-hidden")}>
					<DocumentSubcollections />
				</div>
			)}
		</Card>
	);
}
