import { injectable } from "tsyringe";
import { modelName } from "../models/interfaces/ITag";
import { Tag, TagCondDTO, TagUpdateDTO } from "../models/types/Tag";
import { PrismaRepository } from "../share/components/PrismaRepository";

@injectable()
export class TagRepository extends PrismaRepository<
  Tag,
  TagCondDTO,
  TagUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
