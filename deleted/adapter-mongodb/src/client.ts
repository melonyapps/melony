import { MongoClient } from "mongodb";

// let indexesCreated = false;
// async function createIndexes(client) {
//   if (indexesCreated) return client;
//   const db = client.db();
//   await Promise.all([
//     db
//       .collection('tokens')
//       .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
//     db
//       .collection('posts')
//       .createIndexes([{ key: { createdAt: -1 } }, { key: { creatorId: -1 } }]),
//     db
//       .collection('comments')
//       .createIndexes([{ key: { createdAt: -1 } }, { key: { postId: -1 } }]),
//     db.collection('users').createIndexes([
//       { key: { email: 1 }, unique: true },
//       { key: { username: 1 }, unique: true },
//     ]),
//   ]);
//   indexesCreated = true;
//   return client;
// }

export async function getClient(uri: string) {
	/**
	 * Global is used here to maintain a cached connection across hot reloads
	 * in development. This prevents connections growing exponentiatlly
	 * during API Route usage.
	 * https://github.com/vercel/next.js/pull/17666
	 */
	if (!global.mongoClientPromise) {
		const client = new MongoClient(uri);
		// client.connect() returns an instance of MongoClient when resolved
		global.mongoClientPromise = client.connect();
		// .then((client) => createIndexes(client));
	}
	return global.mongoClientPromise;
}

export async function getDb(uri?: string) {

	if (!uri) {
		throw new Error("No db uri presented");
	}

	const mongoClient = await getClient(uri);
	return mongoClient.db();
}
