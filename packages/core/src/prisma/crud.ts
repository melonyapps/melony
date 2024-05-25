"use server";
import {
	CreateActionPayload,
	DeleteActionPayload,
	ListActionPayload,
	UpdateActionPayload,
} from "@melony/types";
import { prisma } from "./prisma";

export const listAction = async ({ modelName }: ListActionPayload) => {
	"use server";
	// @ts-ignore
	const res = await prisma[modelName].findMany();
	return res;
};

export const getAction = async ({
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

export const createAction = async ({
	modelName,
	data: inputData,
}: CreateActionPayload) => {
	"use server";

	const data = { ...inputData };
	delete data.id;

	// @ts-ignore
	const res = await prisma[modelName].create({
		data,
	});

	return res;
};

export const updateAction = async ({
	modelName,
	data: inputData,
}: UpdateActionPayload) => {
	"use server";

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

export const deleteAction = async ({
	modelName,
	where,
}: DeleteActionPayload) => {
	"use server";

	// @ts-ignore
	const res = await prisma[modelName].delete({
		where,
	});

	return res;
};
