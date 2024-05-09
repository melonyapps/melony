"use client";

import { useParams } from "react-router-dom";
import { CollectionProvider, DocumentProvider } from "@melony/core";
import { Container } from "../components/container";
import { DocumentForm } from "../components/document-form";
import { Header } from "../components/header";

export function EditPage() {
	const params = useParams();

	return (
		<Container>
			<CollectionProvider slug={params?.collectionSlug as string}>
				<DocumentProvider id={params?.docId as string}>
					<Header title="Edit" />
					<DocumentForm />
				</DocumentProvider>
			</CollectionProvider>
		</Container>
	);
}
