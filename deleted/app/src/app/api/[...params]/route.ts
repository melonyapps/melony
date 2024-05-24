import { mongodbAdapter } from "@melony/adapter-mongodb";
import { serve } from "@melony/next";

const db = mongodbAdapter({
	connectionString: process.env.MONGODB_URI,
});

export const { GET, POST, PUT, DELETE } = serve({
	db,
});
