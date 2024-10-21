import {
  VerificationCode,
  VerificationCodeCondDTO,
  VerificationCodeUpdateDTO,
  VerificationCodeCreateDTO
} from "../../models/types/VerificationCode";
import { IService } from "../../share/interfaces/IService";

export interface IVerificationCodeService
  extends IService<
    VerificationCode,
    VerificationCodeCondDTO,
    VerificationCodeCreateDTO,
    VerificationCodeUpdateDTO
  > {}
