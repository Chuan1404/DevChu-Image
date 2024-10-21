import {
  FileUploaded,
  FileUploadedCondDTO,
  FileUploadedUpdateDTO,
} from "../../models/types/FileUploaded";
import { IRepository } from "../../share/interfaces/IRepository";

export interface IFileUploadedRepository
  extends IRepository<
    FileUploaded,
    FileUploadedCondDTO,
    FileUploadedUpdateDTO
  > {}
