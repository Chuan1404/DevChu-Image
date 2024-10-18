import {
  Tag,
  TagCondDTO,
  TagCreateDTO,
  TagUpdateDTO,
} from "../../models/types/Tag";
import { IService } from "../../share/interfaces/IService";

export interface ITagService
  extends IService<Tag, TagCondDTO, TagCreateDTO, TagUpdateDTO> {}
