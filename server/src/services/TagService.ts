import { v7 } from "uuid";
import {
  Tag,
  TagCondDTO,
  TagCreateDTO,
  TagCreateSchema,
  TagSchema,
  TagUpdateDTO,
  TagUpdateSchema,
} from "../models/types/Tag";
import { ITagRepository } from "../repositories/interfaces/ITagRepository";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../share/errors";
import { PagingDTO } from "../share/types";
import { ITagService } from "./interfaces/ITagService";
import { EModelStatus } from "../share/enums";
import { inject, injectable } from "tsyringe";

@injectable()
export class TagService implements ITagService {
  constructor(@inject("ITagRepository") private readonly repository: ITagRepository) {}

  async create(data: TagCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = TagCreateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    const isExisted = await this.repository.findByCond({
      name: parsedData.name,
    });

    if (isExisted) {
      throw ErrDataExisted;
    }

    let newId = v7();
    const newData: Tag = {
      id: newId,
      name: parsedData.name,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.create(newData);

    return newId;
  }

  async update(id: string, data: TagUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = TagUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let refreshToken = await this.repository.find(id);

    if (!refreshToken || refreshToken.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async find(id: string): Promise<Tag> {
    let data = await this.repository.find(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return TagSchema.parse(data);
  }

  async findAll(cond: TagCondDTO, paging: PagingDTO): Promise<Tag[]> {
    let data = await this.repository.findAll(cond, paging);

    return data ? data.map((item) => TagSchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let data = await this.repository.find(id);
    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
