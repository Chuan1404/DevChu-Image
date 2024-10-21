import {
    Tag,
    TagCondDTO,
    TagUpdateDTO,
  } from "../../models/types/Tag";
  import { IRepository } from "../../share/interfaces/IRepository";
  
  export interface ITagRepository
    extends IRepository<
      Tag,
      TagCondDTO,
      TagUpdateDTO
    > {}
  