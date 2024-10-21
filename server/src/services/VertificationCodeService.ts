
import { v7 } from "uuid";
import { VerificationCode, VerificationCodeCondDTO, VerificationCodeCreateDTO, VerificationCodeCreateSchema, VerificationCodeSchema, VerificationCodeUpdateDTO, VerificationCodeUpdateSchema } from "../models/types/VerificationCode";
import { IVerificationCodeRepository } from "../repositories/interfaces/IVerificationCodeRepository";
import { EModelStatus } from "../share/enums";
import { ErrDataExisted, ErrDataInvalid, ErrDataNotFound } from "../share/errors";
import { PagingDTO } from "../share/types";
import { IVerificationCodeService } from "./interfaces/IVertificationCodeService";

export class VerificationCodeService implements IVerificationCodeService {

  constructor(private readonly repository: IVerificationCodeRepository) {}

  async create(data: VerificationCodeCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = VerificationCodeCreateSchema.safeParse(data);

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
    const newData: VerificationCode = {
      id: newId,
      value: parsedData.value,
      userId: parsedData.userId,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.create(newData);

    return newId;
  }

  async update(id: string, data: VerificationCodeUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = VerificationCodeUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let refreshToken = await this.repository.find(id);

    if (!refreshToken || refreshToken.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async find(id: string): Promise<VerificationCode> {
    let data = await this.repository.find(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return VerificationCodeSchema.parse(data);
  }

  async findAll(
    cond: VerificationCodeCondDTO,
    paging: PagingDTO
  ): Promise<VerificationCode[]> {
    let data = await this.repository.findAll(cond, paging);

    return data ? data.map((item) => VerificationCodeSchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let data = await this.repository.find(id);
    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
