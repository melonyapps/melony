import { useApp } from "../providers/app-provider";
import { Avatar, AvatarImage } from "../ui/avatar";
import { DisplayFieldProps } from "./types";

export const DisplayDocument = ({ defaultValue, field }: DisplayFieldProps) => {
	const { models } = useApp();

	const relatedModel = models?.find((x) => x.name === field.type);

	const displayField = relatedModel?.fields?.find((x) => x?.isDisplayField);
	const imageField = relatedModel?.fields?.find(
		(x) => x?.component === "Image",
	);

	return (
		<div className="min-w-[0] flex items-center gap-2">
			{imageField && (
				<Avatar className="w-5 h-5">
					<AvatarImage src={defaultValue?.[imageField.name]} />
				</Avatar>
			)}

			<span className="block truncate">
				{defaultValue?.[displayField?.name || "id"]}
			</span>
		</div>
	);
};
