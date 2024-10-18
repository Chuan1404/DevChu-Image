import express from "express"
import { UserController } from "../controllers/express/UserController"
import { UserRepository } from "../repositories/UserRepository"
import { UserService } from "../services/UserService"
import { modelName } from "../models/interfaces/IUser"
import init from "../models/schemas/UserSchema"

init()

const userRepository = new UserRepository(modelName)
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const userRouter = express.Router()

userRouter.get("/:id", userController.find.bind(userController))

export default userRouter