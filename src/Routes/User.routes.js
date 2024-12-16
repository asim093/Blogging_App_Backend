import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../Controllers/UserController.js";
import  upload  from "../Middleware/Multer.middleware.js";

const router = express.Router();

// register user
router.post("/register", upload.single("image") ,  registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refreshtoken", refreshToken);

export default router;