import {
	CreateActionPayload,
	DeleteActionPayload,
	ListActionPayload,
	Model,
	UpdateActionPayload,
} from "@melony/types";
import { prisma } from "./prisma";

export const listAction = async ({ model }: ListActionPayload) => {
	"use server";

	const relationFieldNames = model.fields
		.filter((x) => x.kind === "object")
		.map((y) => y.name);

	const include = relationFieldNames.reduce<Record<string, boolean>>(
		(prev, curr) => {
			if (curr) prev[curr.toLowerCase()] = true;

			return prev;
		},
		{},
	);

	// TODO: { select } needed for optimization to take only needed fields from related doc

	// @ts-ignore
	const res = await prisma[model.name].findMany({
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
