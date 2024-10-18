import {
  User,
  UserCondDTO,
  UserCreateDTO,
  UserCreateSchema,
  UserSchema,
  UserUpdateDTO,
  UserUpdateSchema,
} from "../models/types/User";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { EAccountStatus, EModelStatus, EUserRole } from "../share/enums";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../share/errors";
import { IHashPassword } from "../share/interfaces/IHashPassword";
import { PagingDTO } from "../share/types";
import { IUserService } from "./interfaces/IUserService";
import { v7 } from "uuid";

export class UserService implements IUserService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly passwordHasher: IHashPassword
  ) {}

  async create(data: UserCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = UserCreateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    const isExisted = await this.repository.findByCond({
      email: parsedData.email,
    });

    if (isExisted) {
      throw ErrDataExisted;
    }

    let hashedPassword = this.passwordHasher.hash(parsedData.password);

    let newId = v7();
    const newData: User = {
      id: newId,
      name: parsedData.name,
      email: parsedData.email,
      avatar: "",
      password: hashedPassword,
      accountStatus: EAccountStatus.UNVERIFIED,
      role: EUserRole.ROLE_CUSTOMER,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.create(newData);

    return newId;
  }
  async update(id: string, data: UserUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = UserUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let User = await this.repository.find(id);

    if (!User || User.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async find(id: string): Promise<User> {
    let data = await this.repository.find(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return UserSchema.parse(data);
  }

  async findAll(cond: UserCondDTO, paging: PagingDTO): Promise<User[]> {
    let data = await this.repository.findAll(cond, paging);

    return data ? data.map((item) => UserSchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let data = await this.repository.find(id);
    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
