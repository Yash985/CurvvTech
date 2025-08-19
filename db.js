import mongoose from "mongoose";

export const ConnectToDB = async () => {
  try {
    const url = process.env.MONGODB_URL;
    await mongoose.connect(url);
    console.log("DB is Connected");
  } catch {
    console.log("Error while connecting to DB");
  }
};
