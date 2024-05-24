"use server";
import { prisma } from "./prisma";

export const getDocs = async ({ modelName }: { modelName: string }) => {
	"use server";
	// @ts-ignore
	const res = await prisma[modelName].findMany();
	return res;
};

export const getDoc = async ({
	modelName,
	where,
}: {
	modelName: string;
	where: any;
}) => {
	// @ts-ignore
	const res = await prisma[modelName].findFirst({ where });
	return res;
};

export const createDoc = async ({
	modelName,
	data: inputData,
}: {
	modelName: string;
	data: any;
}) => {
	const data = { ...inputData };
	delete data.id;

	// @ts-ignore
	const res = await prisma[modelName].create({
		data,
	});

	return res;
};

export const updateDoc = async ({
	modelName,
	data: inputData,
}: {
	modelName: string;
	data: any;
}) => {
	const data = { ...inputData };
	delete data.id;

	// @ts-ignore
	const res = await prisma[modelName].update({
		where: {
			id: inputData?.id,
		},
		data,
	});

	return res;
};
