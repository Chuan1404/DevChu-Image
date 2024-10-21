import {
  Comment,
  CommentCondDTO,
  CommentUpdateDTO,
} from "../../models/types/Comment";
import { IRepository } from "../../share/interfaces/IRepository";

export interface ICommentRepository
  extends IRepository<Comment, CommentCondDTO, CommentUpdateDTO> {}
