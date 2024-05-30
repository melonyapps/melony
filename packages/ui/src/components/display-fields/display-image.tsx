import { DisplayFieldProps } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const DisplayImage = ({ field, defaultValue }: DisplayFieldProps) => {
	return (
		<Avatar className="h-8 w-8">
			<AvatarImage src={defaultValue} alt={field.name} />
			<AvatarFallback></AvatarFallback>
		</Avatar>
	);
};
