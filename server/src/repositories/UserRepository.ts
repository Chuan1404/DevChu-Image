import { injectable } from "tsyringe";
import { User, UserCondDTO, UserUpdateDTO } from "../models/types/User";
import { MongoRepository } from "../share/components/MongoRepository";
import { modelName } from "../models/interfaces/IUser";
import { PrismaRepository } from "../share/components/PrismaRepository";

@injectable()
export class UserRepository extends PrismaRepository<
  User,
  UserCondDTO,
  UserUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
