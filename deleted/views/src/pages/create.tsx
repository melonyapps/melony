"use client";

import { useParams } from "react-router-dom";
import { CollectionProvider } from "@melony/core";
import { Container } from "../components/container";
import { DocumentForm } from "../components/document-form-for-modal";
import { Header } from "../components/header";

export function CreatePage() {
	const params = useParams();

	return (
		<Container>
			<CollectionProvider slug={params?.collectionSlug as string}>
				<Header title="Create" />
				<DocumentForm />
			</CollectionProvider>
		</Container>
	);
}
