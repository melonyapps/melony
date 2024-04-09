const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(
  "mongodb+srv://root:hVgNZcUEQ9Xj4CO6@melony0.a4mqzba.mongodb.net/?retryWrites=true&w=majority"
);

const connectDb = async () => {
  const conn = await mongoClient.connect();

  console.log("connected.");

  return conn;
};

module.exports = { connectDb, mongoClient };
