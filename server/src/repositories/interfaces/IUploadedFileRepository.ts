import {
  UploadedFile,
  UploadedFileCondDTO,
  UploadedFileUpdateDTO,
} from "../../models/types/UploadedFile";
import { IRepository } from "../../share/interfaces/IRepository";
import { PagingDTO } from "../../share/types";

export interface IUploadedFileRepository
  extends IRepository<
    UploadedFile,
    UploadedFileCondDTO,
    UploadedFileUpdateDTO
  > {
    search(kw: string, paging: PagingDTO): Promise<string[]>
  }
