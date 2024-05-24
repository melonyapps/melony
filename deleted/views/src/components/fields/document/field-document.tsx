import { Badge } from "@melony/ui";
import { DocumentFieldProps } from "@melony/core";
import { CollectionProvider, useCollection } from "@melony/core";
import { Avatar, AvatarImage } from "@melony/ui";

export const FieldDocument = ({
	field,
	defaultValue,
}: {
	field: DocumentFieldProps;
	defaultValue: any;
}) => {
	if (!defaultValue) return <></>;

	return (
		<CollectionProvider slug={field.collectionSlug}>
			<FieldDocumentContent field={field} defaultValue={defaultValue} />
		</CollectionProvider>
	);
};

export const FieldDocumentContent = ({
	field,
	defaultValue,
}: {
	field: DocumentFieldProps;
	defaultValue: any;
}) => {
	const { data: collectionData } = useCollection();

	const title = collectionData?.title
		? defaultValue?.[collectionData?.title]
		: defaultValue?.title;

	const image = collectionData?.image
		? defaultValue?.[collectionData?.image]
		: defaultValue?.image;

	return (
		<Badge
			variant="secondary"
			color={defaultValue?.[collectionData?.color || "color"]}
		>
			<div className="flex items-center">
				{image && (
					<Avatar className="h-5 w-5 mr-2">
						<AvatarImage src={image} />
					</Avatar>
				)}
				{title}
			</div>
		</Badge>
	);
};
