import { inject, injectable } from "tsyringe";
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
import {
  EAccountStatus,
  EFileQuality,
  EModelStatus,
  EUserRole,
} from "../share/enums";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../share/errors";
import { IHashPassword } from "../share/interfaces/IHashPassword";
import { PagingDTO } from "../share/types";
import { IUserService } from "./interfaces/IUserService";
import { v7 } from "uuid";
import { IImageHandler } from "../share/interfaces/IImageHandler";
import IUploader from "../share/interfaces/IUploader";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("IUserRepository") private readonly repository: IUserRepository,
    @inject("IHashPassword") private readonly passwordHasher: IHashPassword,
    @inject("IImageHandler")
    private readonly imageHandler: IImageHandler,
    @inject("IUploader")
    private readonly uploader: IUploader
  ) {}

  async create(data: UserCreateDTO): Promise<string> {
    const { success, data: parsedData } = UserCreateSchema.safeParse(data);
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
      role: parsedData.role,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (parsedData.avatar) {
      const url = await this.uploader.uploadFile(
        parsedData.avatar,
        EFileQuality.AVATAR
      );
      newData.avatar = url
    }

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
