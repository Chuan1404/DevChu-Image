import { User, UserCondDTO, UserUpdateDTO } from "../../models/types/User";
import { IRepository } from "../../share/interfaces/IRepository";

export interface IUserRepository
  extends IRepository<User, UserCondDTO, UserUpdateDTO> {}
