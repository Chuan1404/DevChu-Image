import { inject, injectable } from "tsyringe";
import { v7 } from "uuid";
import {
  Comment,
  CommentCondDTO,
  CommentCreateDTO,
  CommentCreateSchema,
  CommentSchema,
  CommentUpdateDTO,
  CommentUpdateSchema,
} from "../models/types/Comment";
import { ICommentRepository } from "../repositories/interfaces/ICommentRepository";
import { EModelStatus } from "../share/enums";
import { ErrDataInvalid, ErrDataNotFound } from "../share/errors";
import { PagingDTO } from "../share/types";
import { ICommentService } from "./interfaces/ICommentService";

@injectable()
export class CommentService implements ICommentService {
  constructor(
    @inject("ICommentRepository")
    private readonly repository: ICommentRepository
  ) {}

  async create(data: CommentCreateDTO): Promise<string> {
    const { success, data: parsedData } = CommentCreateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let newId = v7();
    const newData: Comment = {
      id: newId,
      content: parsedData.content,
      fileId: parsedData.fileId,
      userId: parsedData.userId,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.create(newData);

    return newId;
  }

  async update(id: string, data: CommentUpdateDTO): Promise<boolean> {
    const { success, data: parsedData } = CommentUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let refreshToken = await this.repository.find(id);

    if (!refreshToken || refreshToken.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async find(id: string): Promise<Comment> {
    let data = await this.repository.find(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return CommentSchema.parse(data);
  }

  async findAll(cond: CommentCondDTO, paging: PagingDTO): Promise<Comment[]> {
    let data = await this.repository.findAll(cond, paging);

    return data ? data.map((item) => CommentSchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let data = await this.repository.find(id);
    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
