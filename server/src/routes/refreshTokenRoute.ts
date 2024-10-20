import express from "express";
import { RefreshTokenController } from "../controllers/RefreshTokenController";
import { modelName } from "../models/interfaces/IRefreshToken";
import init from "../models/schemas/RefreshTokenSchema";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { RefreshTokenService } from "../services/RefreshTokenService";

init();

const refreshTokenRepository = new RefreshTokenRepository(modelName);
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
const refreshTokenController = new RefreshTokenController(refreshTokenService);
const refreshTokenRouter = express.Router();

refreshTokenRouter.get(
  "/",
  refreshTokenController.findAll.bind(refreshTokenController)
);
refreshTokenRouter.get(
  "/:id",
  refreshTokenController.find.bind(refreshTokenController)
);
refreshTokenRouter.post(
  "/",
  refreshTokenController.create.bind(refreshTokenController)
);
refreshTokenRouter.patch(
  "/:id",
  refreshTokenController.update.bind(refreshTokenController)
);
refreshTokenRouter.delete(
  "/:id",
  refreshTokenController.delete.bind(refreshTokenController)
);

export default refreshTokenRouter;
