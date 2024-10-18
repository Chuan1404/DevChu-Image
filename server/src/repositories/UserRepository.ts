import { User, UserCondDTO, UserUpdateDTO } from "../models/types/User";
import { MongoRepository } from "../share/components/MongoRepository";

export class UserRepository extends MongoRepository<
  User,
  UserCondDTO,
  UserUpdateDTO
> {}
