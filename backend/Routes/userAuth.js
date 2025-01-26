import { Router } from "express";
import {
  getStatus,
  login,
  logout,
  register,
} from "../controllers/user.register.js";
import passport from "passport";

const router = Router();

router.post("/register", register);
//using passport middleware
router.post("/login", passport.authenticate("local"), login);

router.get("/status", getStatus);

router.post("/logout", logout);

export default router;
