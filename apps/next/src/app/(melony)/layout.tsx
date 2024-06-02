import { makeApp } from "melony/next";
import { prisma } from "melony/prisma";

export default makeApp({
	actions: {
		Project: [
			{
				name: "Calculate total amount",
				handle: async ({ docs }) => {
					"use server";

					await Promise.all(
						docs.map(async (doc: any) => {
							const tasks = await prisma.task.findMany({
								where: {
									projectId: doc.id,
								},
							});

							const amount = tasks.reduce((prev, curr) => {
								return prev + curr.price;
							}, 0);

							await prisma.project.update({
								where: {
									id: doc.id,
								},
								data: {
									amount,
								},
							});
						}),
					);
				},
			},
			{
				name: "Send reminder email",
				handle: async ({ docs }) => {
					"use server";
				},
			},
		],
	},
});
