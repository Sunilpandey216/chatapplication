import express from "express";
import {cors} from "cors";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import {User} from "./models/user.model.js";
import {clerkMiddleware} from "@clerk/express";

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL ;

const app = express();
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.get("/health",(res,req) =>{
  req.
  res.statusCode(200).json({ok:true});
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }

  console.log(`Server is running on port ${PORT}`);
});