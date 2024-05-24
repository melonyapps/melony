export function dateReviver(key: string, value: string) {
	if (isValidDate(value)) {
		return new Date(value);
	}

	return value;
}

export function isValidDate(dateString: string) {
	const regex = /^\d{4}-\d{2}-\d{2}.*$/;
	return regex.test(dateString);
}
