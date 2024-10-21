import express from "express";
import { TagController } from "../controllers/TagController";
import { modelName } from "../models/interfaces/ITag";
import { TagRepository } from "../repositories/TagRepository";
import { TagService } from "../services/TagService";
import { container } from "tsyringe";

export default function setupTagRoute() {
  const tagController = container.resolve(TagController);
  const tagRouter = express.Router();

  tagRouter.get("/", tagController.findAll.bind(tagController));
  tagRouter.get("/top", tagController.findAll.bind(tagController));
  tagRouter.get("/:id", tagController.find.bind(tagController));
  tagRouter.post("/", tagController.create.bind(tagController));
  tagRouter.patch("/:id", tagController.update.bind(tagController));
  tagRouter.delete("/:id", tagController.delete.bind(tagController));

  return tagRouter;
}
