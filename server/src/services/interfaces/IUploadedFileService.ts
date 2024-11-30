import {
  UploadedFile,
  UploadedFileCondDTO,
  UploadedFileCreateDTO,
  UploadedFileUpdateDTO,
} from "../../models/types/UploadedFile";
import { IService } from "../../share/interfaces/IService";

export interface IUploadedFileService
  extends IService<
    UploadedFile,
    UploadedFileCondDTO,
    UploadedFileCreateDTO,
    UploadedFileUpdateDTO
  > {
    checkBeforeCreate(file: Express.Multer.File): Promise<boolean>;
  }
