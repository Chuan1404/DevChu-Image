import { modelName } from "../models/interfaces/IUserRight";
import {
    UserRight,
    UserRightCondDTO,
    UserRightUpdateDTO,
  } from "../models/types/UserRight";
  import { MongoRepository } from "../share/components/MongoRepository";
  
  export class UserRightRepository extends MongoRepository<
    UserRight,
    UserRightCondDTO,
    UserRightUpdateDTO
  > {
    constructor() {
      super(modelName);
    }
  }
  