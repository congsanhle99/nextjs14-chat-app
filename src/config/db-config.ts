import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log("Error: ", error);
  }
};
