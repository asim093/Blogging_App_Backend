import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 },
});

export default upload;
