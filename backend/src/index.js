import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use(clerkMiddleware());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
});

if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));

    app.get("*", (req, res) => {
        res.sendFile(path.join(publicDir, "index.html"));
    });
}

const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

startServer();