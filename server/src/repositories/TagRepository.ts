import { injectable } from "tsyringe";
import { modelName } from "../models/interfaces/ITag";
import { Tag, TagCondDTO, TagUpdateDTO } from "../models/types/Tag";
import { MongoRepository } from "../share/components/MongoRepository";

@injectable()
export class TagRepository extends MongoRepository<
  Tag,
  TagCondDTO,
  TagUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
