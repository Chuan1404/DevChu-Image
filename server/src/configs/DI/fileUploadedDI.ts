import { container } from "tsyringe";
import { IUploadedFileRepository } from "../../repositories/interfaces/IUploadedFileRepository";
import { IUploadedFileService } from "../../services/interfaces/IUploadedFileService";
import { UploadedFileRepository } from "../../repositories/UploadedFileRepository";
import { UploadedFileService } from "../../services/UploadedFileService";
import { UploadedFileController } from "../../controllers/UploadedFileController";

export default function setupUploadedFileDI() {
  container.register<IUploadedFileRepository>("IUploadedFileRepository", {
    useClass: UploadedFileRepository,
  });
  container.register<IUploadedFileService>("IUploadedFileService", {
    useClass: UploadedFileService,
  });
  container.register<UploadedFileController>("UploadedFileController", {
    useClass: UploadedFileController,
  });
}
