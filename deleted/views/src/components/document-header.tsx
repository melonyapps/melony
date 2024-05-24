import { useCollection, useDocument } from "@melony/core";
import { Button } from "@melony/ui";
import { Pencil } from "lucide-react";
import { Header } from "./header";
import { DocumentDropdownMenu } from "./document-dropdown-menu";
import { Skeleton } from "@melony/ui";
import { useNavigate } from "react-router-dom";

export function DocumentHeader({}: {}): JSX.Element {
	const navigate = useNavigate();
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
							navigate(`/${collectionSlug}/edit/${documentId}`);
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
