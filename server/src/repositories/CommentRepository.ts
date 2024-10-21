import { injectable } from "tsyringe";
import {
  Comment,
  CommentCondDTO,
  CommentUpdateDTO,
} from "../models/types/Comment";
import { MongoRepository } from "../share/components/MongoRepository";
import { modelName } from "../models/interfaces/IComment";

@injectable()
export class CommentRepository extends MongoRepository<
  Comment,
  CommentCondDTO,
  CommentUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
