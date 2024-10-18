import {
  Comment,
  CommentCondDTO,
  CommentCreateDTO,
  CommentUpdateDTO,
} from "../../models/types/Comment";
import { IService } from "../../share/interfaces/IService";

export interface ICommentService
  extends IService<
    Comment,
    CommentCondDTO,
    CommentCreateDTO,
    CommentUpdateDTO
  > {}
