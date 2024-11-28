import { modelName } from "../models/interfaces/IVerificationCode";
import {
  VerificationCode,
  VerificationCodeCondDTO,
  VerificationCodeUpdateDTO,
} from "../models/types/VerificationCode";
import { PrismaRepository } from "../share/components/PrismaRepository";

export class VerificationCodeRepository extends PrismaRepository<
  VerificationCode,
  VerificationCodeCondDTO,
  VerificationCodeUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
