
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
await mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));}
export { connectDB };
















// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// async function connectDB() {
//     try {
//         const mongoURI = process.env.MONGO_URI;
//         if (!mongoURI) {
//             throw new Error("MONGO_URI is not defined in the environment variables");
//         }
//         await mongoose.connect(mongoURI);
//         console.log("MongoDB connected", mongoose.connection.host);
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//         process.exit(1);
//     }}
//     export { connectDB };