import express from "express";
import { UserController } from "../controllers/UserController";
import { modelName } from "../models/interfaces/IUser";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { HashPassword } from "../share/components/password";

const hashPassword = new HashPassword();
const userRepository = new UserRepository(modelName);
const userService = new UserService(userRepository, hashPassword);
const userController = new UserController(userService);
const userRouter = express.Router();

userRouter.get("/", userController.findAll.bind(userController));
userRouter.get("/:id", userController.find.bind(userController));
userRouter.post("/", userController.create.bind(userController));
userRouter.patch("/:id", userController.update.bind(userController));
userRouter.delete("/:id", userController.delete.bind(userController));

export default userRouter;
