import {
  User,
  UserCondDTO,
  UserCreateDTO,
  UserUpdateDTO,
} from "../../models/types/User";
import { IService } from "../../share/interfaces/IService";

export interface IUserService
  extends IService<User, UserCondDTO, UserCreateDTO, UserUpdateDTO> {}
