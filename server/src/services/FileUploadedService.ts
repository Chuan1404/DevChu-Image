import { v7 } from "uuid";
import {
  FileUploaded,
  FileUploadedCondDTO,
  FileUploadedCreateDTO,
  FileUploadedCreateSchema,
  FileUploadedSchema,
  FileUploadedUpdateDTO,
  FileUploadedUpdateSchema,
} from "../models/types/FileUploaded";
import { IFileUploadedRepository } from "../repositories/interfaces/IFileUploadedRepository";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../share/errors";
import { PagingDTO } from "../share/types";
import { IFileUploadedService } from "./interfaces/IFileUploadedService";
import { EModelStatus } from "../share/enums";
import { inject, injectable } from "tsyringe";

@injectable()
export class FileUploadedService implements IFileUploadedService {
  constructor(
    @inject("IFileUploadedRepository")
    private readonly repository: IFileUploadedRepository
  ) {}

  async create(data: FileUploadedCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = FileUploadedCreateSchema.safeParse(data);

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
    const newData: FileUploaded = {
      id: newId,
      root: parsedData.root,
      display: parsedData.display,
      high: parsedData.high,
      medium: parsedData.medium,
      width: parsedData.width,
      title: parsedData.title,
      price: parsedData.price,
      size: parsedData.size,
      fileType: parsedData.fileType,
      height: parsedData.height,
      userId: parsedData.userId,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.create(newData);

    return newId;
  }

  async update(id: string, data: FileUploadedUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = FileUploadedUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let refreshToken = await this.repository.find(id);

    if (!refreshToken || refreshToken.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async find(id: string): Promise<FileUploaded> {
    let data = await this.repository.find(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return FileUploadedSchema.parse(data);
  }

  async findAll(
    cond: FileUploadedCondDTO,
    paging: PagingDTO
  ): Promise<FileUploaded[]> {
    let data = await this.repository.findAll(cond, paging);

    return data ? data.map((item) => FileUploadedSchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let data = await this.repository.find(id);
    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
