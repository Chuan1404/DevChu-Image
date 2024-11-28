import { modelName } from "../models/interfaces/IUserRight";
import {
  UserRight,
  UserRightCondDTO,
  UserRightUpdateDTO,
} from "../models/types/UserRight";
import { PrismaRepository } from "../share/components/PrismaRepository";

export class UserRightRepository extends PrismaRepository<
  UserRight,
  UserRightCondDTO,
  UserRightUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
