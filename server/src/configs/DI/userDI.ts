import { container } from "tsyringe";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { IUserService } from "../../services/interfaces/IUserService";
import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../../services/UserService";
import { UserController } from "../../controllers/UserController";

export default function setupUserDI() {
  container.register<IUserRepository>("IUserRepository", {
    useClass: UserRepository,
  });
  container.register<IUserService>("IUserService", {
    useClass: UserService,
  });
  container.register<UserController>(UserController, {
    useClass: UserController,
  });
}
