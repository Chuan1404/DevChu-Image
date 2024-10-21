import express from "express";
import { container } from "tsyringe";
import AuthController from "../controllers/AuthController";

export default function setupAuthRoute() {
  const authController = container.resolve(AuthController);

  const authRouter = express.Router();

  authRouter.get(
    "/verify/:code",
    authController.verifyUser.bind(authController)
  );

  authRouter.post("/register", authController.register.bind(authController));
  authRouter.post("/sign-in", authController.login.bind(authController));
  authRouter.post(
    "/refresh-token",
    authController.refreshToken.bind(authController)
  );

  return authRouter;
}
