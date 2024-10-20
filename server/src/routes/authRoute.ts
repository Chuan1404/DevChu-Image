import express from "express";
import { ComparePassword, HashPassword } from "../share/components/password";
import { modelName as userModelName } from "../models/interfaces/IUser";
import { UserRepository } from "../repositories/UserRepository";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { modelName as refreshTokenModelName } from "../models/interfaces/IRefreshToken";

const hashPassword = new HashPassword();
const comparePassword = new ComparePassword();
const userRepository = new UserRepository(userModelName);
const refreshTokenRepository = new RefreshTokenRepository(
  refreshTokenModelName
);

const authService = new AuthService(
  userRepository,
  refreshTokenRepository,
  hashPassword,
  comparePassword
);
const authController = new AuthController(authService);

const authRouter = express.Router();

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/sign-in", authController.login.bind(authController));
authRouter.post("/refresh-token", authController.refreshToken.bind(authController));

export default authRouter;
