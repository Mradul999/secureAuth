import { Router } from "express";
import { register } from "../controllers/user.register.js";
import passport from "passport";

const router = Router();

router.post("/register", register);

export default router;
