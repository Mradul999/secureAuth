import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connection;
