import {
  Comment,
  CommentCondDTO,
  CommentCreateDTO,
  CommentUpdateDTO,
} from "../models/types/Comment";
import { PagingDTO } from "../share/types";
import { ICommentService } from "./interfaces/ICommentService";

export class CommentService implements ICommentService {
  find(id: string): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  findAll(cond: CommentCondDTO, paging: PagingDTO): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  create(data: CommentCreateDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: CommentUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, isHard?: boolean): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
