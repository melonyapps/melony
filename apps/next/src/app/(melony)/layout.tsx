import { makeApp } from "melony/next";

export default makeApp({
	actions: {
		users: [
			{
				name: "Send email",
				handle: async ({ docs }) => {
					"use server";
				},
			},
		],
	},
});
