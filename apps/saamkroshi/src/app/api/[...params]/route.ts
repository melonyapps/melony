import { melony } from "@/melony";
import { mongodbAdapter } from "@melony/adapter-mongodb";
import { triggers } from "@melony/core/config";
import { serve } from "@melony/next";

export const { GET, POST, PUT, DELETE } = serve({
	...melony,
	adapter: mongodbAdapter,
	triggers: [
		triggers.db({
			slug: "autoIncrementProjectId",
			collectionSlug: "65a307eab68869084c9faa3d",
			on: ["update", "create", "delete"],
			func: async ({ db, type, oldDocument, newDocument }) => {},
		}),
	],
});
