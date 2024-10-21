import { container } from "tsyringe";
import { IAuthService } from "../../services/interfaces/IAuthService";
import AuthService from "../../services/AuthService";
import AuthController from "../../controllers/AuthController";

export default function setupAuthDI() {
  container.register<IAuthService>("IAuthService", {
    useClass: AuthService,
  });
  container.register<AuthController>("AuthController", {
    useClass: AuthController,
  });
}
