import { Router } from "express";
import { login, register } from "../controllers/user.register.js";
import passport from "passport";

const router = Router();

router.post("/register", register);
//using passport middleware 
router.post("/login", passport.authenticate("local"), login);

export default router;
