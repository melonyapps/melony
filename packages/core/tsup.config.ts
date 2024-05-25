import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		entry: {
			auth: "src/next/index.ts",
			next: "src/next/index.ts",
			prisma: "src/prisma/index.ts",
		},
		tsconfig: "./tsconfig.json",
		format: ["esm", "cjs"],
		splitting: false,
		sourcemap: false,
		clean: true,
		minify: !options.watch,
		dts: true,
	};
});
