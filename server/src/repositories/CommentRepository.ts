import {
  Comment,
  CommentCondDTO,
  CommentUpdateDTO,
} from "../models/types/Comment";
import { MongoRepository } from "../share/components/MongoRepository";

export class CommentRepository extends MongoRepository<
  Comment,
  CommentCondDTO,
  CommentUpdateDTO
> {}
