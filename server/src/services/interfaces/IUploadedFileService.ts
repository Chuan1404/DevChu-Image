import {
  UploadedFile,
  UploadedFileCondDTO,
  UploadedFileCreateDTO,
  UploadedFileUpdateDTO,
} from "../../models/types/UploadedFile";
import { IService } from "../../share/interfaces/IService";
import { PagingDTO } from "../../share/types";

export interface IUploadedFileService
  extends IService<
    UploadedFile,
    UploadedFileCondDTO,
    UploadedFileCreateDTO,
    UploadedFileUpdateDTO
  > {
    checkBeforeCreate(file: Express.Multer.File): Promise<boolean>;
    search(kw: string, paging: PagingDTO): Promise<string[]>
  }
