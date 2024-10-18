import {
  User,
  UserCondDTO,
  UserCreateDTO,
  UserUpdateDTO,
} from "../models/types/User";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { EModelStatus } from "../share/enums";
import { ErrDataNotFound } from "../share/errors";
import { PagingDTO } from "../share/types";
import { IUserService } from "./interfaces/IUserService";

export class UserService implements IUserService {
  constructor(private readonly repository: IUserRepository) {}

  async find(id: string): Promise<User> {
    let data = await this.repository.find(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return data;
  }
  findAll(cond: UserCondDTO, paging: PagingDTO): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  create(data: UserCreateDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: UserUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, isHard?: boolean): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
