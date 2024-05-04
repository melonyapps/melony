import { Collection, DocumentFieldProps } from "@melony/core/config";
import { Adapter as MelonyAdapter } from "@melony/core/types";
import { dateReviver } from "@melony/core/utils";
import { clientPromise } from "./client";
import { Db, Document, MongoClient, ObjectId } from "mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";
import { filterToQuery } from "@melony/core/filter";

export const mongodbAdapter = ({
	id,
	collections,
}: {
	id: string;
	collections: Collection[];
}): MelonyAdapter & { auth: Adapter } => {
	// const client = clientPromise;

	let client: MongoClient;
	let db: Db;
	const connectDb = async () => {
		client = await clientPromise;
		db = client.db(id || "");
	};

	connectDb();

	return {
		auth: MongoDBAdapter(clientPromise, {
			databaseName: id,
		}),
		getDocuments: async ({ collectionSlug, filter, sort, searchTerm }) => {
			const collection = collections.find((x) => x.slug === collectionSlug);
			const schema = collection?.schema || [];

			try {
				const pipeline: Document[] | undefined = [];

				pipeline.push({ $addFields: { _id: { $toString: "$_id" } } });

				// filter
				const matches = filter ? filterToQuery(filter) : {};

				if (searchTerm) {
					matches["title"] = new RegExp(searchTerm, "i");
				}

				pipeline.push({ $match: { ...matches } });

				// TODO: unlike sql, nosql lookup is super expensive. solution needed for denormalization.
				// TODO: typescript organisation needed with multiple fields enum
				const docFields: DocumentFieldProps[] = schema.filter((field) =>
					["DOCUMENT"].includes(field.type || ""),
				);
				docFields.map((docField) => {
					pipeline.push({
						$lookup: {
							from: docField?.collectionSlug || "unknown",
							// localField: `${docField?.slug}`,
							// foreignField: "_id", // _id objectId not supported for foreignField
							let: { localFieldSlug: `$${docField?.slug}` },
							pipeline: [
								{ $addFields: { id: { $toString: "$_id" } } },
								{ $match: { $expr: { $eq: ["$id", `$$localFieldSlug`] } } },
							],
							as: `${docField?.slug}_full`,
						},
					});
					pipeline.push({
						$unwind: {
							path: `$${docField?.slug}_full`,
							preserveNullAndEmptyArrays: true,
						},
					});
				});

				if (sort) {
					pipeline.push({
						$sort: { [sort?.field]: sort?.direction === "desc" ? -1 : 1 },
					});
				}

				// query
				const docs = await db
					.collection(collectionSlug)
					.aggregate(pipeline)
					.toArray();

				return { docs, meta: { total: 100 } };
			} catch (e) {
				return { docs: [], meta: { total: 100 } };
			}
		},
		getDocument: async ({ collectionSlug, docId }) => {
			const collection = collections.find((x) => x.slug === collectionSlug);
			const schema = collection?.schema || [];

			try {
				const pipeline: Document[] | undefined = [];

				pipeline.push({
					$match: {
						_id: ObjectId.isValid(docId) ? new ObjectId(docId) : docId,
					},
				});

				// addFields after matching objectId
				pipeline.push({ $addFields: { _id: { $toString: "$_id" } } });

				// TODO: unlike sql dvs, nosql lookup is super expensive. solution needed for denormalization.
				// TODO: type script organisation needed with multiple fields enum
				const docFields: DocumentFieldProps[] = schema.filter((field) =>
					["DOCUMENT"].includes(field.type || ""),
				);
				docFields.map((docField) => {
					pipeline.push({
						$lookup: {
							from: docField?.collectionSlug || "unknown",
							let: { localFieldSlug: `$${docField?.slug}` },
							pipeline: [
								{ $addFields: { id: { $toString: "$_id" } } },
								{ $match: { $expr: { $eq: ["$id", `$$localFieldSlug`] } } },
							],
							as: `${docField?.slug}_full`,
						},
					});
					pipeline.push({
						$unwind: {
							path: `$${docField?.slug}_full`,
							preserveNullAndEmptyArrays: true,
						},
					});
				});

				pipeline.push({
					$limit: 1,
				});

				const docs = await db
					.collection(collectionSlug)
					.aggregate(pipeline)
					.toArray();

				return { data: docs?.[0] || {}, meta: {} };
			} catch (e) {
				return { data: {}, meta: {} };
			}
		},
		createDocument: async ({ collectionSlug, data, auth }) => {
			// serialize body
			var serializedBody = JSON.stringify(data);
			// parse to detect date fields
			var parsedBody = JSON.parse(serializedBody, dateReviver);

			const res = await db.collection(collectionSlug).insertOne({
				...parsedBody,
				createdAt: new Date(),
				createdBy: auth?.user?.email,
			});

			return res;
		},
		updateDocument: async ({ collectionSlug, docId, data }) => {
			// serialize body
			var serializedBody = JSON.stringify(data);
			// parse to detect date fields
			var parsedBody = JSON.parse(serializedBody, dateReviver);

			const res = await db.collection(collectionSlug).updateOne(
				{
					_id: new ObjectId(docId),
				},
				{
					$set: {
						...parsedBody,
						updatedAt: new Date(),
					},
				},
			);

			return res;
		},
		deleteDocument: async ({ collectionSlug, docId }) => {
			const res = await db.collection(collectionSlug).deleteOne({
				_id: new ObjectId(docId),
			});

			return res;
		},
		getSuggestions: async ({ collectionSlug }) => {
			try {
				const pipeline: Document[] | undefined = [];

				const docs = await db
					.collection(collectionSlug)
					.aggregate(pipeline)
					.toArray();

				return { docs, meta: { total: 100 } };
			} catch (e) {
				return { docs: [], meta: { total: 100 } };
			}
		},
	};
};
