import {
  VerificationCode,
  VerificationCodeCondDTO,
  VerificationCodeUpdateDTO,
} from "../../models/types/VerificationCode";
import { IRepository } from "../../share/interfaces/IRepository";

export interface IVerificationCodeRepository
  extends IRepository<
    VerificationCode,
    VerificationCodeCondDTO,
    VerificationCodeUpdateDTO
  > {}
