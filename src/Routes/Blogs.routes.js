import express from "express";
import upload from "../Middleware/Multer.middleware.js";
import { authentication } from "../Middleware/auth.middleware.js";
import {
  Addblogs,
  Allblogs,
  deleteBlog,
  Editblogs,
  Patchblogs,
  Singleblog,
} from "../Controllers/BlogsController.js";

const router = express.Router();

// register user
router.post("/AddBlog", upload.single("image"), authentication, Addblogs);
router.get("/AllBlog", Allblogs);
router.put("/Editblogs/:id", upload.single("image"), authentication, Editblogs);
router.patch("/Patchblogs/:id", upload.single("image"), authentication, Patchblogs);
router.get("/Singleblog/:id", upload.single("image"), authentication, Singleblog);
router.delete("/deleteBlog/:id", upload.single("image"), authentication, deleteBlog);

export default router;
