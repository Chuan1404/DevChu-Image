import express from "express";
import { container } from "tsyringe";
import { FileUploadedController } from "../controllers/FileUploadedController";

export default function setupFileUploadedRoute() {
  const fileUploadedController = container.resolve(FileUploadedController);
  const fileUploadedRouter = express.Router();

  fileUploadedRouter.get(
    "/",
    fileUploadedController.findAll.bind(fileUploadedController)
  );
  fileUploadedRouter.get(
    "/:id",
    fileUploadedController.find.bind(fileUploadedController)
  );
  fileUploadedRouter.post(
    "/",
    fileUploadedController.create.bind(fileUploadedController)
  );
  fileUploadedRouter.patch(
    "/:id",
    fileUploadedController.update.bind(fileUploadedController)
  );
  fileUploadedRouter.delete(
    "/:id",
    fileUploadedController.delete.bind(fileUploadedController)
  );

  return fileUploadedRouter;
}
