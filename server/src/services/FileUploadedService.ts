import {
  FileUploaded,
  FileUploadedCondDTO,
  FileUploadedCreateDTO,
  FileUploadedUpdateDTO,
} from "../models/types/FileUploaded";
import { PagingDTO } from "../share/types";
import { IFileUploadedService } from "./interfaces/IFileUploadedService";

export class FileUploadedService implements IFileUploadedService {
  find(id: string): Promise<FileUploaded> {
    throw new Error("Method not implemented.");
  }
  findAll(
    cond: FileUploadedCondDTO,
    paging: PagingDTO
  ): Promise<FileUploaded[]> {
    throw new Error("Method not implemented.");
  }
  create(data: FileUploadedCreateDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: FileUploadedUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, isHard?: boolean): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
