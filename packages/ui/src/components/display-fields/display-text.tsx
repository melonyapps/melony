import { DisplayFieldProps } from "./types";

export const DisplayText = ({ defaultValue }: DisplayFieldProps) => {
	return (
		<span className="block truncate">
			{typeof defaultValue === "object"
				? JSON.stringify(defaultValue)
				: defaultValue}
		</span>
	);
};
