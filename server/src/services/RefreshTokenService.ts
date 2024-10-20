import { v7 } from "uuid";
import {
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenCreateDTO,
  RefreshTokenCreateSchema,
  RefreshTokenSchema,
  RefreshTokenUpdateDTO,
  RefreshTokenUpdateSchema,
} from "../models/types/RefreshToken";
import { IRefreshTokenRepository } from "../repositories/interfaces/IRefreshTokenRepository";
import { EModelStatus } from "../share/enums";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../share/errors";
import { PagingDTO } from "../share/types";
import { IRefreshTokenService } from "./interfaces/IRefreshTokenService";

export class RefreshTokenService implements IRefreshTokenService {
  constructor(private readonly repository: IRefreshTokenRepository) {}

  async create(data: RefreshTokenCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = RefreshTokenCreateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    const isExisted = await this.repository.findByCond({
      userId: parsedData.userId,
    });

    if (isExisted) {
      throw ErrDataExisted;
    }

    let newId = v7();
    const newData: RefreshToken = {
      id: newId,
      token: parsedData.token,
      userId: parsedData.userId,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.create(newData);

    return newId;
  }

  async update(id: string, data: RefreshTokenUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = RefreshTokenUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let refreshToken = await this.repository.find(id);

    if (!refreshToken || refreshToken.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async find(id: string): Promise<RefreshToken> {
    let data = await this.repository.find(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return RefreshTokenSchema.parse(data);
  }

  async findAll(
    cond: RefreshTokenCondDTO,
    paging: PagingDTO
  ): Promise<RefreshToken[]> {
    let data = await this.repository.findAll(cond, paging);

    return data ? data.map((item) => RefreshTokenSchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let data = await this.repository.find(id);
    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
