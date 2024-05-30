import {
	CreateActionPayload,
	DeleteActionPayload,
	ListActionPayload,
	Model,
	UpdateActionPayload,
} from "@melony/types";
import { prisma } from "./prisma";
import { convertFilterToPrisma } from "./helpers";

export const listAction = async ({ model, filter }: ListActionPayload) => {
	"use server";

	const where = convertFilterToPrisma(filter || []);

	const include = model.fields
		.filter((x) => x.kind === "object")
		.reduce<Record<string, any>>((prev, curr) => {
			if (curr)
				prev[curr.name.toLowerCase()] = curr.isList ? { take: 3 } : true;

			return prev;
		}, {});

	// TODO: { select } needed for optimization to take only needed fields from related doc

	// @ts-ignore
	const res = await prisma[model.name].findMany({
		where,
		include,
	}); // TODO: here modelName is camelCase so im not sure how it works when prisma.user model is always lowerCase.
	return res;
};

export const getAction = async ({
	model,
	where,
}: {
	model: Model;
	where: any;
}) => {
	// @ts-ignore
	const res = await prisma[model.name].findFirst({ where });
	return res;
};

export const createAction = async ({
	model,
	data: inputData,
}: CreateActionPayload) => {
	"use server";

	const data = { ...inputData };
	delete data.id;

	// @ts-ignore
	const res = await prisma[model.name].create({
		data,
	});

	return res;
};

export const updateAction = async ({
	model,
	data: inputData,
}: UpdateActionPayload) => {
	"use server";

	const data = { ...inputData };
	delete data.id;

	// @ts-ignore
	const res = await prisma[model.name].update({
		where: {
			id: inputData?.id,
		},
		data,
	});

	return res;
};

export const deleteAction = async ({ model, where }: DeleteActionPayload) => {
	"use server";

	// @ts-ignore
	const res = await prisma[model.name].delete({
		where,
	});

	return res;
};
