import {
    Tag,
    TagCondDTO,
    TagUpdateDTO,
  } from "../models/types/Tag";
  import { MongoRepository } from "../share/components/MongoRepository";
  
  export class TagRepository extends MongoRepository<
    Tag,
    TagCondDTO,
    TagUpdateDTO
  > {}
  