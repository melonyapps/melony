import { formatDate, formatDateTime } from "@melony/ui/lib";
import { DateFieldProps } from "@melony/core/config";

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
