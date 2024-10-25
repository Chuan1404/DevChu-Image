import { container } from "tsyringe";
import { IFileUploadedRepository } from "../../repositories/interfaces/IFileUploadedRepository";
import { IFileUploadedService } from "../../services/interfaces/IFileUploadedService";
import { FileUploadedRepository } from "../../repositories/FileUploadedRepository";
import { FileUploadedService } from "../../services/FileUploadedService";
import { FileUploadedController } from "../../controllers/FileUploadedController";

export default function setupFileUploadedDI() {
  container.register<IFileUploadedRepository>("IFileUploadedRepository", {
    useClass: FileUploadedRepository,
  });
  container.register<IFileUploadedService>("IFileUploadedService", {
    useClass: FileUploadedService,
  });
  container.register<FileUploadedController>("FileUploadedController", {
    useClass: FileUploadedController,
  });
}
