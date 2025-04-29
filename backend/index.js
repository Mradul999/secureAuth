import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import connection from "./config/connection.js";
import authRoutes from "./Routes/userAuth.js";
import "./config/passportConfig.js";

dotenv.config();

//calling this fucntion to connect to the mongodb

connection();

//creating an instance of express
const app = express();

//middlewares

// this middleware is used to handle the json data sent  in the body of a http request
app.use(express.json());

//this middleware is used to configure Cross-Origin Resource Sharing (CORS) in your Express application.like our backend is running on differnt port and frontend on different to share resources between them we use cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Access-Control-Allow-Origin"],
  })
);

//this middleware is used to create and manage user sessions  to store and manage user specific data (authentication details)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,

      sameSite: "none",   
      secure: true
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.SERVER_PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
