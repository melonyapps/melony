import { DisplayFieldProps } from "./types";

export const DisplayColor = ({ defaultValue }: DisplayFieldProps) => {
	return (
		<div
			className="rounded-full bg-neutral/20 dark:bg-white/20 h-6 w-6 cursor-pointer"
			style={{ backgroundColor: defaultValue }}
		/>
	);
};
