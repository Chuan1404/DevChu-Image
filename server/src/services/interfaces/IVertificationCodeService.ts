import {
  VertificationCode,
  VertificationCodeCondDTO,
  VertificationCodeCreateDTO,
  VertificationCodeUpdateDTO,
} from "../../models/types/VertificationCode";
import { IService } from "../../share/interfaces/IService";

export interface IVertificationCodeService
  extends IService<
    VertificationCode,
    VertificationCodeCondDTO,
    VertificationCodeCreateDTO,
    VertificationCodeUpdateDTO
  > {}
