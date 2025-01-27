import { Router } from "express";
import {
  getStatus,
  login,
  logout,
  register,
  reset2fa,
  setup2fa,
  verify2fa,
} from "../controllers/user.register.js";
import passport from "passport";
import { routeProtection } from "../middlewares/routeProtection.js";

const router = Router();

router.post("/register", register);
//using passport middleware
router.post("/login", passport.authenticate("local"), login);

router.get("/status", getStatus);

router.post("/logout", logout);

// we are using a middleware to protect the 2fa routes because
//  it is accessible only when the user has completed the 1factor authentication
//  before going for the 2fa
router.post("/2fa/setup", routeProtection, setup2fa);
router.post("/2fa/verify", routeProtection, verify2fa);
router.post("/2fa/reset", routeProtection, reset2fa);

export default router;
