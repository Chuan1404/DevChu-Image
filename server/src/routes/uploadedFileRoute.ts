import express from "express";
import { container } from "tsyringe";
import { upload } from "../configs/multer";
import { UploadedFileController } from "../controllers/UploadedFileController";

export default function setupUploadedFileRoute() {
  const fileController = container.resolve(UploadedFileController);
  const fileRoute = express.Router();

  fileRoute.get("/search", fileController.search.bind(fileController));
  fileRoute.get("/:id", fileController.find.bind(fileController));
  fileRoute.get("/", fileController.findAll.bind(fileController));

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
