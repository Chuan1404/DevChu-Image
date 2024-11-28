import { injectable } from "tsyringe";
import { modelName } from "../models/interfaces/IComment";
import {
  Comment,
  CommentCondDTO,
  CommentUpdateDTO,
} from "../models/types/Comment";
import { PrismaRepository } from "../share/components/PrismaRepository";

@injectable()
export class CommentRepository extends PrismaRepository<
  Comment,
  CommentCondDTO,
  CommentUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
