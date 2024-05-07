import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";

import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// ''router Object

const router = express.Router();

//routing
// register method --> POST

router.post("/register", registerController);

// login method --> POST
router.post("/login", loginController);

// forgot password ==> post
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected auth route for user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

//protected auth route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
