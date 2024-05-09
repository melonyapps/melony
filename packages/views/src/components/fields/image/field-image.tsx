import { InputFieldProps } from "@melony/core";
import { Avatar, AvatarFallback, AvatarImage } from "@melony/ui";

export const FieldImage = ({
	field,
	defaultValue,
}: {
	field: InputFieldProps;
	defaultValue: any;
}) => {
	return (
		<Avatar className="h-8 w-8 rounded-md">
			<AvatarImage src={defaultValue} alt={field.slug} />
			<AvatarFallback></AvatarFallback>
		</Avatar>
	);
};
