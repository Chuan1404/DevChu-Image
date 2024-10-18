import {
  VertificationCode,
  VertificationCodeCondDTO,
  VertificationCodeUpdateDTO,
} from "../models/types/VertificationCode";
import { MongoRepository } from "../share/components/MongoRepository";

export class VertificationCodeRepository extends MongoRepository<
  VertificationCode,
  VertificationCodeCondDTO,
  VertificationCodeUpdateDTO
> {}
