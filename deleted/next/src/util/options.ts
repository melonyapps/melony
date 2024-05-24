type ParsedOptions = { [key: string]: string | boolean };

export function parseStringOptions(str: string): ParsedOptions {
	const options: ParsedOptions = {};

	for (const option of str.split(/\s+/)) {
		const [key, value] = option.split("=");

		// Handle case with no value (key is treated as a truthy value)
		options[key as string] = value === undefined ? true : value;
	}

	return options;
}
