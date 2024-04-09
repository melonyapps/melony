import { serve } from "@melony/next";
import { mongodbAdapter } from "@melony/adapter-mongodb";
import { collection, fields, views, triggers } from "@melony/core/config";

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
          collectionSlug: "65a2cb777f0c2c91ea054cb6",
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
      ],
      views: [
        views.cards({
          slug: "projectsByDate",
          label: "თარიღის მიხედვით",
          icon: "🚧",
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
        views.cards({
          slug: "cardsView",
          label: "ქარდებად დალაგება",
        }),
      ],
    },
    {
      slug: "65a307f0b68869084c9faa3e",
      label: "პროექტის სტატუსები",
      schema: [
        fields.input({ slug: "title" }),
        fields.input({ slug: "color" }),
      ],
    },
    {
      slug: "65a30f57b68869084c9faa43",
      label: "არტიკულის სტატუსები",
      schema: [
        fields.input({ slug: "title" }),
        fields.input({ slug: "color" }),
      ],
    },
    {
      slug: "65a2cb777f0c2c91ea054cb6",
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
