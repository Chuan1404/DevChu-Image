import {
  FileUploaded,
  FileUploadedCondDTO,
  FileUploadedCreateDTO,
  FileUploadedUpdateDTO,
} from "../../models/types/FileUploaded";
import { IService } from "../../share/interfaces/IService";

export interface IFileUploadedService
  extends IService<
    FileUploaded,
    FileUploadedCondDTO,
    FileUploadedCreateDTO,
    FileUploadedUpdateDTO
  > {
    checkBeforeCreate(file: Express.Multer.File): Promise<boolean>;
  }
