import { modelName } from "../models/interfaces/IVerificationCode";
import {
  VerificationCode,
  VerificationCodeCondDTO,
  VerificationCodeUpdateDTO,
} from "../models/types/VerificationCode";
import { MongoRepository } from "../share/components/MongoRepository";

export class VerificationCodeRepository extends MongoRepository<
  VerificationCode,
  VerificationCodeCondDTO,
  VerificationCodeUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
