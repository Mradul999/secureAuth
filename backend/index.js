import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.SERVER_PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

