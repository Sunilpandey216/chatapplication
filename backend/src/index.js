import express from "express";
import cors  from "cors";
import dotenv from "dotenv";
import fs from "fs";
import {connectDB} from "./lib/db.js";
import User from "./models/users.model.js"
import {clerkMiddleware} from "@clerk/express";

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL ;
const publicDir=path.join(process.cwd(), 'public');
const app = express();
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.get("/health",(req,res) =>{
  res.status(200).json({ok:true});
});


if(fs.existsSync(publicDir)){
  app.use(express.static(publicDir));
  app.get("/{any}",(req,res,next)=>{
    res.sendFile(path.join(publicDir,"index.html"),(err)
  =>next(err)
  )
  });
}

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }

  console.log(`Server is running on port ${PORT}`);
});