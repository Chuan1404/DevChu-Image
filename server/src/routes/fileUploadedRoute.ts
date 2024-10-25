import express from "express";
import { container } from "tsyringe";
import { FileUploadedController } from "../controllers/FileUploadedController";
import { upload } from "../configs/multer";

export default function setupFileUploadedRoute() {
  const fileController = container.resolve(FileUploadedController);
  const fileRoute = express.Router();

  fileRoute.get("/", fileController.findAll.bind(fileController));
  fileRoute.get("/:id", fileController.find.bind(fileController));

  fileRoute.post(
    "/check",
    upload.single("file"),
    fileController.checkFile.bind(fileController)
  );
  
  fileRoute.post(
    "/upload",
    upload.single("file"),
    fileController.upload.bind(fileController)
  );

  fileRoute.patch("/:id", fileController.update.bind(fileController));
  fileRoute.delete("/:id", fileController.delete.bind(fileController));

  return fileRoute;
}
