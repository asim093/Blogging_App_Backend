import express from "express";
import  upload  from "../Middleware/Multer.middleware.js";
import { authentication } from "../Middleware/auth.middleware.js";
import { Addblogs } from "../Controllers/BlogsController.js";

const router = express.Router();

// register user
router.post("/AddBlog", upload.single("image") , authentication , Addblogs );


export default router;