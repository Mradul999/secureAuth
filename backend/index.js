import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import connection from "./config/connection.js";
import authRoutes from "./Routes/userAuth.js";

dotenv.config();

connection();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


//Routes
app.use("/api/auth", authRoutes);




const PORT = process.env.SERVER_PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
