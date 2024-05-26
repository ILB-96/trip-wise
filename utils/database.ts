import mongoose from 'mongoose';

const MONGO_URI: string =
  process.env.MONGO_URI || "your_default_connection_string";
export const DB_NAME = "share_prompt";

let connection: mongoose.ConnectionStates;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (connection) {
    return;
  }
  try {
    const db = await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
    });
    connection = db.connections[0].readyState;
    console.log("MongoDB connection established");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};


