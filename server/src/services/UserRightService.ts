import {
  UserRight,
  UserRightCondDTO,
  UserRightCreateDTO,
  UserRightUpdateDTO,
} from "../models/types/UserRight";
import { PagingDTO } from "../share/types";
import { IUserRightService } from "./interfaces/IUserRightService";

export class UserRightService implements IUserRightService {
  find(id: string): Promise<UserRight> {
    throw new Error("Method not implemented.");
  }
  findAll(cond: UserRightCondDTO, paging: PagingDTO): Promise<UserRight[]> {
    throw new Error("Method not implemented.");
  }
  create(data: UserRightCreateDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: UserRightUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, isHard?: boolean): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
