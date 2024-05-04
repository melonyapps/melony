import { mongodbAdapter } from "@melony/adapter-mongodb";
import { collection, fields, triggers, views } from "@melony/core/config";
import { serve } from "@melony/next";

export const { GET, POST, PUT, DELETE } = serve({
	id: "65a2b2167f0c2c91ea054cb3",
	adapter: mongodbAdapter,
	ui: {
		logo: "🏭",
		title: "საამქროში",
	},
	collections: [
		{
			slug: "65a307eab68869084c9faa3d",
			label: "პროექტები",
			schema: [
				fields.input({ slug: "title", label: "ID", isRequired: true }),
				fields.currency({ slug: "amount", label: "ღირებულება" }),
				fields.document({
					slug: "65a2cb777f0c2c91ea054cb6_id",
					label: "კლიენტი",
					collectionSlug: "clients",
				}),
				fields.document({
					slug: "status",
					label: "სტატუსი",
					collectionSlug: "65a307f0b68869084c9faa3e",
				}),
				fields.documents({
					slug: "items",
					label: "არტიკულები",
					collectionSlug: "65a30f4db68869084c9faa42",
					// defaultViewSlug: "cardsView",
				}),
				fields.documents({
					slug: "files",
					label: "ფაილები",
					collectionSlug: "project_files",
				}),
				fields.documents({
					slug: "invoices",
					label: "ინვოისები",
					collectionSlug: "orders",
				}),
			],
			views: [
				views.cards({
					slug: "projectsByDate",
					label: "პროექტები",
					icon: "Folder",
				}),
			],
		},
		{
			slug: "65a30f4db68869084c9faa42",
			label: "არტიკულები",
			schema: [
				fields.input({ slug: "title", label: "ID", isRequired: true }),
				fields.document({
					slug: "65a307eab68869084c9faa3d_id",
					label: "პროექტი",
					collectionSlug: "65a307eab68869084c9faa3d",
				}),
				fields.document({
					slug: "status",
					label: "სტატუსი",
					collectionSlug: "65a30f57b68869084c9faa43",
				}),
				fields.currency({
					slug: "CURRENCY_InylBO",
					label: "ერთ. ფასი",
					symbol: "₾",
				}),
			],
			views: [
				views.table({
					slug: "cardsView",
					label: "წარმოება",
					icon: "Folder",
				}),
			],
		},
		{
			slug: "orders",
			label: "ინვოისები",
			schema: [
				fields.input({ slug: "title" }),
				fields.document({
					slug: "client_id",
					collectionSlug: "65a2cb777f0c2c91ea054cb6",
					label: "კლიენტი",
				}),
			],
		},
		{
			slug: "65a307f0b68869084c9faa3e",
			label: "პროექტის სტატუსები",
			schema: [fields.input({ slug: "title" }), fields.input({ slug: "color" })],
		},
		{
			slug: "project_files",
			label: "პროექტის ფაილები",
			schema: [fields.input({ slug: "title" })],
		},
		{
			slug: "65a30f57b68869084c9faa43",
			label: "არტიკულის სტატუსები",
			schema: [fields.input({ slug: "title" }), fields.input({ slug: "color" })],
		},
		{
			slug: "clients",
			label: "კლიენტები",
			schema: [fields.input({ slug: "title" })],
		},
	],
	triggers: [
		triggers.db({
			slug: "autoIncrementProjectId",
			collectionSlug: "65a307eab68869084c9faa3d",
			on: ["update", "create", "delete"],
			func: async ({ db, type, oldDocument, newDocument }) => {},
		}),
	],
});
