import {
  UserRight,
  UserRightCondDTO,
  UserRightCreateDTO,
  UserRightUpdateDTO,
} from "../../models/types/UserRight";
import { IService } from "../../share/interfaces/IService";

export interface IUserRightService
  extends IService<
    UserRight,
    UserRightCondDTO,
    UserRightCreateDTO,
    UserRightUpdateDTO
  > {}
