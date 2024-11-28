import { injectable } from "tsyringe";
import { modelName } from "../models/interfaces/IFileUploaded";
import {
  FileUploaded,
  FileUploadedCondDTO,
  FileUploadedUpdateDTO,
} from "../models/types/FileUploaded";
import { PrismaRepository } from "../share/components/PrismaRepository";

@injectable()
export class FileUploadedRepository extends PrismaRepository<
  FileUploaded,
  FileUploadedCondDTO,
  FileUploadedUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
