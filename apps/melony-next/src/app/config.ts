import { collection, config, fields } from "@melony/core/config";

// const authProvider = firebaseAuthProvider({
//   apiKey: "AIzaSyD7bgrl9nUKyWBvmklN4QBPcT-0bJegz6w",
//   authDomain: `${"melonify-app"}.firebaseapp.com`,
//   projectId: "melonify-app",
// });

export default config({
  id: "65a2b2167f0c2c91ea054cb3",
  collections: {
    "65a307eab68869084c9faa3d": {
      label: "Projects",
      schema: {
        title: fields.input({ label: "ID", isRequired: true }),
        amount: fields.input({ label: "ღირებულება", type: "CURRENCY" }),
        DOCUMENT_bv1f44: fields.document({
          label: "კლიენტი",
          collectionSlug: "65a2cb777f0c2c91ea054cb6",
        }),
        status: fields.document({
          label: "სტატუსი",
          collectionSlug: "65a307f0b68869084c9faa3e",
        }),
      },
    },
  },
  // collections: {
  //   leads: collection({
  //     label: "Leads",
  //     schema: {
  //       title: fields.input({ isRequired: true }),
  //       status: fields.document({
  //         collectionSlug: "leads-statuses",
  //       }),
  //     },
  //   }),
  // },
  // collections: [
  //   {
  //     title: "Leads",
  //     slug: "leads",
  //     fields: [
  //       {
  //         key: "title",
  //         title: "Title",
  //         type: "TEXT",
  //         params: {
  //           isRequired: true,
  //         },
  //       },
  //       {
  //         key: "status",
  //         title: "Status",
  //         type: "DOCUMENT",
  //         params: {
  //           collectionSlug: "leads-statuses",
  //           creatable: true,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     title: "Lead Statuses",
  //     slug: "leads-statuses",
  //     fields: [
  //       {
  //         key: "title",
  //         title: "Title",
  //         type: "TEXT",
  //         params: {
  //           isRequired: true,
  //         },
  //       },
  //     ],
  //   },
  // ],
  // id: "65940c17c7036bb7592a6161",
  // collections: [
  //   {
  //     title: "Visits",
  //     slug: "6594112cc7036bb7592a616c",
  //     fields: [
  //       {
  //         key: "title",
  //         title: "ვიზიტის მოკლე აღწერა",
  //         type: "TEXT",
  //         params: {
  //           isRequired: true,
  //         },
  //       },
  //       {
  //         key: "date",
  //         title: "ვიზიტის თარიღი",
  //         type: "DATE",
  //         params: {
  //           hasTime: true,
  //         },
  //       },
  //       {
  //         key: "DOCUMENT_a8BcKf",
  //         title: "კლიენტი",
  //         type: "DOCUMENT",
  //         params: {
  //           isRequired: true,
  //           creatable: true,
  //           autoFill: [
  //             {
  //               localField: "LOCATION_qnwgjB",
  //               foreignField: "LOCATION_NT3eHv",
  //             },
  //           ],
  //           collectionSlug: "65941368c7036bb7592a6175",
  //         },
  //       },
  //       {
  //         key: "reason",
  //         title: "სერვისი",
  //         type: "DOCUMENT",
  //         params: {
  //           colorFieldKey: "color",
  //           creatable: true,
  //           collectionSlug: "65941207c7036bb7592a616e",
  //         },
  //       },
  //       {
  //         key: "ACTIVITY_bz1emj",
  //         title: "Activity",
  //         type: "ACTIVITY",
  //         params: {
  //           foreignField: "doc",
  //         },
  //       },
  //       {
  //         key: "CURRENCY_IFVApG",
  //         title: "ღირებულება",
  //         type: "CURRENCY",
  //         params: {
  //           symbol: "₾",
  //         },
  //       },
  //       {
  //         key: "LOCATION_qnwgjB",
  //         title: "ლოკაცია",
  //         type: "LOCATION",
  //       },
  //       {
  //         key: "65941ce8c7036bb7592a617c_visit",
  //         title: "მკურნალობები",
  //         type: "RELATED",
  //         params: {
  //           foreignField: "visit",
  //           collectionSlug: "65941ce8c7036bb7592a617c",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     title: "Patients",
  //     slug: "65940dfec7036bb7592a6163",
  //     fields: [
  //       {
  //         key: "image",
  //         title: "Image",
  //         type: "ATTACHMENT",
  //       },
  //       {
  //         key: "title",
  //         title: "Title",
  //         type: "TEXT",
  //       },
  //       {
  //         key: "dateOfBirth",
  //         title: "Date of birth",
  //         type: "DATE",
  //       },
  //       {
  //         key: "sex",
  //         title: "Sex",
  //         type: "DOCUMENT",
  //         params: {
  //           colorFieldKey: "color",
  //           collectionSlug: "659410a3c7036bb7592a6169",
  //         },
  //       },
  //       {
  //         key: "animal",
  //         title: "Animal",
  //         type: "DOCUMENT",
  //         params: {
  //           creatable: true,
  //           colorFieldKey: "color",
  //           collectionSlug: "65941057c7036bb7592a6164",
  //         },
  //       },
  //       {
  //         key: "owner",
  //         title: "Owner",
  //         type: "DOCUMENT",
  //         params: {
  //           collectionSlug: "65941368c7036bb7592a6175",
  //         },
  //       },
  //       {
  //         key: "65941ce8c7036bb7592a617c_pet",
  //         title: "მკურნალობები",
  //         type: "RELATED",
  //         params: {
  //           foreignField: "pet",
  //         },
  //       },
  //     ],
  //   },
  // ],
});
