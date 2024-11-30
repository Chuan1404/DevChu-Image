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
import { IUploadedFileRepository } from "../repositories/interfaces/IUploadedFileRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { EModelStatus } from "../share/enums";
import { ErrDataInvalid, ErrDataNotFound } from "../share/errors";
import { PagingDTO } from "../share/types";
import { ICommentService } from "./interfaces/ICommentService";

@injectable()
export class CommentService implements ICommentService {
  constructor(
    @inject("ICommentRepository")
    private readonly repository: ICommentRepository,
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository,
    @inject("IUploadedFileRepository")
    private readonly fileRepository: IUploadedFileRepository
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

    let comment = await this.repository.find(id);

    if (!comment || comment.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async find(id: string): Promise<Comment> {
    let comment = await this.repository.find(id);

    if (!comment || comment.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    const user = await this.userRepository.find(comment.userId);
    const file = await this.fileRepository.find(comment.fileId);

    return { ...CommentSchema.parse(comment), user, file };
  }

  async findAll(cond: CommentCondDTO, paging: PagingDTO): Promise<Comment[]> {
    let comments = await this.repository.findAll(cond, paging);

    const userIds = [...new Set(comments.map((comment) => comment.userId))];
    const fileIds = [...new Set(comments.map((comment) => comment.fileId))];

    const users = await this.userRepository.findAll({ id: userIds });
    const files = await this.fileRepository.findAll({ id: fileIds });

    // convert list to hashmap
    const userMap = users.reduce((acc: { [key: string]: any }, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    const fileMap = files.reduce((acc: { [key: string]: any }, file) => {
      acc[file.id] = file;
      return acc;
    }, {});

    return comments
      ? comments.map((item) => ({
          ...CommentSchema.parse(item),
          user: userMap[item.userId],
          file: fileMap[item.fileId],
        }))
      : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let data = await this.repository.find(id);
    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
