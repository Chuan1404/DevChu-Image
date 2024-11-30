import sharp from "sharp";
import { inject, injectable } from "tsyringe";
import { v7 } from "uuid";
import {
  UploadedFile,
  UploadedFileCondDTO,
  UploadedFileCreateDTO,
  UploadedFileCreateSchema,
  UploadedFileSchema,
  UploadedFileUpdateDTO,
  UploadedFileUpdateSchema,
} from "../models/types/UploadedFile";
import { IUploadedFileRepository } from "../repositories/interfaces/IUploadedFileRepository";
import { EFileQuality, EModelStatus, EQualityValue } from "../share/enums";
import { ErrDataInvalid, ErrDataNotFound } from "../share/errors";
import { IImageHandler } from "../share/interfaces/IImageHandler";
import IUploader from "../share/interfaces/IUploader";
import { PagingDTO } from "../share/types";
import { IUploadedFileService } from "./interfaces/IUploadedFileService";

@injectable()
export class UploadedFileService implements IUploadedFileService {
  constructor(
    @inject("IUploadedFileRepository")
    private readonly repository: IUploadedFileRepository,
    @inject("IImageHandler")
    private readonly imageHandler: IImageHandler,
    @inject("IUploader")
    private readonly uploader: IUploader
  ) {}

  async create(data: UploadedFileCreateDTO): Promise<string> {
    const { success, data: parsedData } =
      UploadedFileCreateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    const metadata = await sharp(parsedData.file.buffer).metadata();

    const newId = v7();
    const newData: UploadedFile = {
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

    const keys = Object.keys(EFileQuality);

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
            EQualityValue.DISPLAY
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
            EQualityValue.MEDIUM
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
            EQualityValue.HIGH
          );
          url = await this.uploader.uploadFile(resizedFile, EFileQuality.HIGH);
          newData.high = url;
          break;
      }
    }

    await this.repository.create(newData);

    return newId;
  }

  async update(id: string, data: UploadedFileUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = UploadedFileUpdateSchema.safeParse(data);

    if (!success) {
      console.log(error);
      throw ErrDataInvalid;
    }

    const refreshToken = await this.repository.find(id);

    if (!refreshToken || refreshToken.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async find(id: string): Promise<UploadedFile> {
    const data = await this.repository.find(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return UploadedFileSchema.parse(data);
  }

  async findAll(
    cond: UploadedFileCondDTO,
    paging: PagingDTO
  ): Promise<UploadedFile[]> {
    const data = await this.repository.findAll(cond, paging);
    return data ? data.map((item) => UploadedFileSchema.parse(item)) : [];
  }

  async search(kw: string, paging: PagingDTO): Promise<string[]> {
    const data = await this.repository.search(kw, paging);
    return data;
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    const data = await this.repository.find(id);
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
