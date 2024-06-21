import "dotenv/config";
import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;
    console.log(mongoURL)
    if (!mongoURL) {
      throw new Error("MongoDB connection URL is undefined.");
    }

    const options = {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connection = await mongoose.connect(mongoURL, options);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
