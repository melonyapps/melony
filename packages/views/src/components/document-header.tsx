import { useCollection, useDocument } from "@melony/core/react";
import { Button } from "@melony/ui/button";
import { Pencil } from "lucide-react";
import { Header } from "./header";
import { DocumentDropdownMenu } from "./document-dropdown-menu";
import { Skeleton } from "@melony/ui/skeleton";
import { useMelonyNavigate } from "../hooks/use-melony-navigate";

export function DocumentHeader({}: {}): JSX.Element {
	const navigate = useMelonyNavigate();
	const { slug: collectionSlug, view, data: collectionData } = useCollection();
	const { data, isLoading } = useDocument();

	const documentId = data?._id;

	const title = collectionData?.title
		? data?.[collectionData?.title]
		: data?.title;

	return (
		<Header
			title={isLoading ? <Skeleton className="w-40 h-4" /> : title}
			toolbar={
				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={() => {
							navigate(
								`/c/${collectionSlug}/v/${view?.slug || "base"}/d/edit/${documentId}`,
							);
						}}
					>
						<Pencil className="h-4 w-4 mr-2" /> Edit
					</Button>

					<DocumentDropdownMenu docId={documentId} />
				</div>
			}
		/>
	);
}
