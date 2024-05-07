import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGO DB CONNECTED");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
