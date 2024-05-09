"use client";

import { useParams } from "react-router-dom";
import { CollectionProvider, DocumentProvider } from "@melony/core";
import { Container } from "../components/container";
import { DocumentHeader } from "../components/document-header";
import { DocumentContent } from "../components/document-content";

export function ViewPage() {
	const params = useParams();

	return (
		<Container>
			<CollectionProvider slug={params?.collectionSlug as string}>
				<DocumentProvider id={params?.docId as string}>
					<DocumentHeader />
					<DocumentContent />
				</DocumentProvider>
			</CollectionProvider>
		</Container>
	);
}
