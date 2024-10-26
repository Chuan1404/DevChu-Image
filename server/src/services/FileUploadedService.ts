import sharp from "sharp";
import { inject, injectable } from "tsyringe";
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
import { EFileQuality, EModelStatus, EQuantiryValue } from "../share/enums";
import { ErrDataInvalid, ErrDataNotFound } from "../share/errors";
import { IImageHandler } from "../share/interfaces/IImageHandler";
import IUploader from "../share/interfaces/IUploader";
import { PagingDTO } from "../share/types";
import { IFileUploadedService } from "./interfaces/IFileUploadedService";

@injectable()
export class FileUploadedService implements IFileUploadedService {
  constructor(
    @inject("IFileUploadedRepository")
    private readonly repository: IFileUploadedRepository,
    @inject("IImageHandler")
    private readonly imageHandler: IImageHandler,
    @inject("IUploader")
    private readonly uploader: IUploader
  ) {}

  async create(data: FileUploadedCreateDTO): Promise<string> {
    const { success, data: parsedData } =
      FileUploadedCreateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    const metadata = await sharp(parsedData.file.buffer).metadata();

    let newId = v7();
    const newData: FileUploaded = {
      id: newId,
      root: "",
      display: "",
      high: "",
      medium: "",
      width: metadata.width!,
      height: metadata.height!,
      title: parsedData.title,
      price: parsedData.price,
      size: metadata.size ?? 0,
      fileType: metadata.format!,
      userId: parsedData.userId,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let keys = Object.keys(EFileQuality);

    for (const key of keys) {
      let url: string, resizedFile: Express.Multer.File;

      switch (key) {
        case EFileQuality.ROOT:
          url = await this.uploader.uploadFile(
            parsedData.file,
            EFileQuality.ROOT
          );
          newData.root = url;
          break;

        case EFileQuality.DISPLAY:
          resizedFile = await this.imageHandler.resizedFile(
            parsedData.file,
            EQuantiryValue.DISPLAY
          );
          url = await this.uploader.uploadFile(
            resizedFile,
            EFileQuality.DISPLAY
          );
          newData.display = url;
          break;

        case EFileQuality.MEDIUM:
          resizedFile = await this.imageHandler.resizedFile(
            parsedData.file,
            EQuantiryValue.MEDIUM
          );
          url = await this.uploader.uploadFile(
            resizedFile,
            EFileQuality.MEDIUM
          );
          newData.medium = url;
          break;

        case EFileQuality.HIGH:
          resizedFile = await this.imageHandler.resizedFile(
            parsedData.file,
            EQuantiryValue.HIGH
          );
          url = await this.uploader.uploadFile(resizedFile, EFileQuality.HIGH);
          newData.high = url;
          break;
      }
    }

    await this.repository.create(newData);

    return newId;
  }

  async update(id: string, data: FileUploadedUpdateDTO): Promise<boolean> {
    const { success, data: parsedData, error } =
      FileUploadedUpdateSchema.safeParse(data);

    if (!success) {
      console.log(error)
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

  async checkBeforeCreate(file: Express.Multer.File): Promise<boolean> {
    await this.imageHandler.checkFile(file);
    return true;
  }
}
