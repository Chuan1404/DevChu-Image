import { container } from "tsyringe";
import { IRefreshTokenRepository } from "../repositories/interfaces/IRefreshTokenRepository";
import { IRefreshTokenService } from "../services/interfaces/IRefreshTokenService";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { RefreshTokenService } from "../services/RefreshTokenService";
import { RefreshTokenController } from "../controllers/RefreshTokenController";

export default function setupRefreshTokenDI() {
  container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
    useClass: RefreshTokenRepository,
  });
  container.register<IRefreshTokenService>("IRefreshTokenService", {
    useClass: RefreshTokenService,
  });
  container.register<RefreshTokenController>("RefreshTokenController", {
    useClass: RefreshTokenController,
  });
}
