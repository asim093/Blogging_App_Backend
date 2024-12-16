import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
    cloud_name: "dg5m042zm", // Replace with your actual Cloudinary cloud name
    api_key: "555478587788914", // Replace with your actual Cloudinary API key
    api_secret: "Su1jrwGQ7K6eYUYl9YHUUYAYwos", // Replace with your actual Cloudinary API secret
  });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

export { cloudinary, storage };
