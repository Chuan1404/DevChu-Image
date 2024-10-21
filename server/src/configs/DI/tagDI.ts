import { container } from "tsyringe";
import { ITagRepository } from "../../repositories/interfaces/ITagRepository";
import { ITagService } from "../../services/interfaces/ITagService";
import { TagRepository } from "../../repositories/TagRepository";
import { TagService } from "../../services/TagService";
import { TagController } from "../../controllers/TagController";

export default function setupTagDI() {
    container.register<ITagRepository>("ITagRepository", {
        useClass: TagRepository,
      });
      container.register<ITagService>("ITagService", {
        useClass: TagService,
      });
      container.register<TagController>('TagController', {
        useClass: TagController,
      });
}