import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoInstance: MongoMemoryServer;

const connectToDatabase = async () => {
  mongoInstance = await MongoMemoryServer.create();
  const uri = mongoInstance.getUri();
  mongoose.set("strictQuery", false);
  await mongoose.connect(uri);
};

const dropDatabase = async () => {
  if (mongoInstance) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoInstance.stop();
  }
};
const dropCollections = async () => {
  if (mongoInstance) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
};

export { connectToDatabase, dropCollections, dropDatabase };
