import { useApp } from "../providers/app-provider";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { DisplayFieldProps } from "./types";

export const DisplayDocuments = ({
	defaultValue,
	field,
}: DisplayFieldProps) => {
	const { models } = useApp();

	const relatedModel = models?.find((x) => x.name === field.type);

	const displayField = relatedModel?.fields?.find((x) => x?.isDisplayField);
	const imageField = relatedModel?.fields?.find(
		(x) => x?.component === "Image",
	);

	return (
		<div className="flex gap-1">
			{(defaultValue || []).map((item: any) => (
				<Badge key={item?.id} variant="outline">
					{imageField && (
						<Avatar className="w-6 h-6">
							<AvatarImage src={item?.[imageField.name]} />
						</Avatar>
					)}

					<span className="block truncate">
						{item?.[displayField?.name || "id"]}
					</span>
				</Badge>
			))}
		</div>
	);
};
