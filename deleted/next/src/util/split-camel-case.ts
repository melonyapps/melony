export const splitCamelCase = (camel: string) => {
	const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2");

	return camelCase;
};
