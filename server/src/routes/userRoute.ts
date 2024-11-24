import express from "express";
import { container } from "tsyringe";
import { upload } from "../configs/multer";
import { UserController } from "../controllers/UserController";
import { authorizeUser, authToken } from "../middleware/OAuth2";
import { EUserRole } from "../share/enums";

export default function setupUserRoute() {
  const userController = container.resolve(UserController);

  const userRouter = express.Router();
  userRouter.use(authToken);
  userRouter.get("/get-info", userController.getInfo.bind(userController));
  userRouter.get(
    "/",
    authorizeUser([EUserRole.ROLE_ADMIN]),
    userController.findAll.bind(userController)
  );

  userRouter.post(
    "/",
    upload.single("avatar"),
    userController.create.bind(userController)
  );
  userRouter.patch(
    "/:id",
    upload.single("avatar"),
    userController.update.bind(userController)
  );
  userRouter.delete("/:id", userController.delete.bind(userController));

  return userRouter;
}
