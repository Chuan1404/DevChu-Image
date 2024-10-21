import express from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/UserController";
import { authToken } from "../middleware/OAuth2";

export default function setupUserRoute() {
  const userController = container.resolve(UserController);
  
  const userRouter = express.Router();
  userRouter.use(authToken);
  userRouter.get("/get-info", userController.getInfo.bind(userController));
  userRouter.get("/", userController.findAll.bind(userController));

  userRouter.post("/", userController.create.bind(userController));
  userRouter.patch("/:id", userController.update.bind(userController));
  userRouter.delete("/:id", userController.delete.bind(userController));

  return userRouter
}
