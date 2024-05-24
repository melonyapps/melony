"use client";

import { CollectionProvider, DocumentProvider } from "@melony/core";

import { LoginPage } from "./pages/login";

import { Layout } from "./components/layout";
import { MelonyProvider } from "./components/melony-provider";
import { useMelonyParams } from "./hooks/use-melony-params";
import { Stack } from "./components/stack";
import { Heading } from "./components/heading";
import { Container } from "./components/container";
import { DocumentForm } from "./components/document-form";
import { View } from "./components/view";
import { useMelonyPathname } from "./hooks/use-melony-pathname";
import { CollectionHeader } from "./components/collection-header";
import { DocumentContent } from "./components/document-content";
import { DocumentHeader } from "./components/document-header";
import { Config } from "@melony/core";

type MelonyAppProps = {
	config: Config;
};

export function MelonyApp({ config }: MelonyAppProps) {
	const melonyParams = useMelonyParams();
	const params = melonyParams?.params;
	const pathname = useMelonyPathname();

	const renderContent = () => {
		if (params) {
			switch (params.length) {
				// c/:collectionSlug/v/:viewSlug
				case 4:
					return (
						<Layout>
							<CollectionProvider
								slug={params[1] as string}
								viewSlug={params[3] as string}
							>
								<Container>
									<CollectionHeader />

									<View />
								</Container>
							</CollectionProvider>
						</Layout>
					);

				// c/:collectionSlug/v/:viewSlug/d/:docId|create
				case 6:
					if (params[5] === "create") {
						return (
							<Layout>
								<CollectionProvider slug={params[1] as string}>
									<Container>
										<Stack horizontal gapSize="sm">
											<Heading>Create</Heading>
										</Stack>

										<DocumentForm />
									</Container>
								</CollectionProvider>
							</Layout>
						);
					}

					return (
						<Layout>
							<CollectionProvider slug={params[1] as string}>
								<DocumentProvider id={params[5] as string}>
									<Container>
										<DocumentHeader />

										<DocumentContent />
									</Container>
								</DocumentProvider>
							</CollectionProvider>
						</Layout>
					);

				case 7:
					return (
						<Layout>
							<CollectionProvider slug={params[1] as string}>
								<DocumentProvider id={params[6]}>
									<Container>
										<Stack horizontal gapSize="sm">
											<Heading>Edit</Heading>
										</Stack>

										<DocumentForm />
									</Container>
								</DocumentProvider>
							</CollectionProvider>
						</Layout>
					);

				case 1:
					switch (pathname) {
						case "/login":
							return (
								<div className="h-screen">
									<LoginPage />
								</div>
							);

						default:
							return <>Not found</>;
					}

				default:
					return <>Not found</>;
			}
		}

		return <Layout>{""}</Layout>;
	};

	return <MelonyProvider config={config}>{renderContent()}</MelonyProvider>;
}
