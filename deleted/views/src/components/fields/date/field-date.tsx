import { formatDate, formatDateTime } from "@melony/ui";
import { DateFieldProps } from "@melony/core";

export const FieldDate = ({
	defaultValue,
	field,
}: {
	field: DateFieldProps;
	defaultValue: any;
}) => {
	return (
		<span className="block truncate">
			{defaultValue
				? field?.hasTime
					? formatDateTime(defaultValue)
					: formatDate(defaultValue)
				: "-"}
		</span>
	);
};
