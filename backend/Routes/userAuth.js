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

// Add middleware to log authentication state
router.use((req, res, next) => {
  console.log("=== Route Authentication Check ===");
  console.log("req.isAuthenticated():", req.isAuthenticated());
  console.log("req.user:", req.user);
  console.log("req.session:", req.session);
  next();
});

router.post("/register", register);

// Using passport.authenticate with session
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login",
    failureMessage: true,
  }),
  login
);

// Using session-based authentication for status check
router.get(
  "/status",
  (req, res, next) => {
    console.log("Status route - isAuthenticated:", req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "user not authenticated" });
  },
  getStatus
);

// Using session-based authentication for 2FA routes
router.post("/setup2fa", routeProtection, setup2fa);
router.post("/verify2fa", routeProtection, verify2fa);
router.post("/reset2fa", routeProtection, reset2fa);

export default router;
