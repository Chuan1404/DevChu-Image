import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { v4 } from "uuid";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/share/images"); // Specify the destination folder for uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${v4()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix); // Generate a unique filename
  },
});

// export const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     let error: Error | null = new Error("Unsupported file type. Only JPEG and PNG are allowed.")
//     cb(error, false);
//   }
// };

// Initialize Multer with storage and file filter
export const upload = multer({
    storage: multer.memoryStorage(),
    // fileFilter,
    // limits: { fileSize: 1024 * 1024 * 5 }, // Limit the file size to 5MB
  });
