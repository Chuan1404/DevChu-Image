import {
  UploadedFile,
  UploadedFileCondDTO,
  UploadedFileUpdateDTO,
} from "../../models/types/UploadedFile";
import { IRepository } from "../../share/interfaces/IRepository";

export interface IUploadedFileRepository
  extends IRepository<
    UploadedFile,
    UploadedFileCondDTO,
    UploadedFileUpdateDTO
  > {}
