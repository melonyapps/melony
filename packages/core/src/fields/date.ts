import { DateFieldProps } from "../config";

export function date(params: DateFieldProps): DateFieldProps {
	return {
		...params,
		type: "DATE",
	};
}
