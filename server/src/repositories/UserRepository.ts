import { injectable } from "tsyringe";
import { User, UserCondDTO, UserUpdateDTO } from "../models/types/User";
import { MongoRepository } from "../share/components/MongoRepository";
import { modelName } from "../models/interfaces/IUser";

@injectable()
export class UserRepository extends MongoRepository<
  User,
  UserCondDTO,
  UserUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
