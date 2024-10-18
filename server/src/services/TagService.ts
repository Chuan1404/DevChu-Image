import {
  Tag,
  TagCondDTO,
  TagCreateDTO,
  TagUpdateDTO,
} from "../models/types/Tag";
import { PagingDTO } from "../share/types";
import { ITagService } from "./interfaces/ITagService";

export class TagService implements ITagService {
  find(id: string): Promise<Tag> {
    throw new Error("Method not implemented.");
  }
  findAll(cond: TagCondDTO, paging: PagingDTO): Promise<Tag[]> {
    throw new Error("Method not implemented.");
  }
  create(data: TagCreateDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: TagUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, isHard?: boolean): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
