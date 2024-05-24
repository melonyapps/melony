"use server";

import { prisma } from "../lib/prisma";

export const getDocs = async ({ model }: { model: string }) => {
	// @ts-ignore
	const res = await prisma[model].findMany();
	return res;
};

export const createDoc = async ({
	model,
	data: inputData,
}: {
	model: string;
	data: any;
}) => {
	const data = { ...inputData };
	delete data.id;

	// @ts-ignore
	const res = await prisma[model].create({
		data,
	});

	return res;
};

export const updateDoc = async ({
	model,
	data: inputData,
}: {
	model: string;
	data: any;
}) => {
	const data = { ...inputData };
	delete data.id;

	// @ts-ignore
	const res = await prisma[model].update({
		where: {
			id: inputData?.id,
		},
		data,
	});

	return res;
};
