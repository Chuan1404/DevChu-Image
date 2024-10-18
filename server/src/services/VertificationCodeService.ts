import {
  VertificationCode,
  VertificationCodeCondDTO,
  VertificationCodeCreateDTO,
  VertificationCodeUpdateDTO,
} from "../models/types/VertificationCode";
import { PagingDTO } from "../share/types";
import { IVertificationCodeService } from "./interfaces/IVertificationCodeService";

export class VertificationCodeService implements IVertificationCodeService {
  find(id: string): Promise<VertificationCode> {
    throw new Error("Method not implemented.");
  }
  findAll(
    cond: VertificationCodeCondDTO,
    paging: PagingDTO
  ): Promise<VertificationCode[]> {
    throw new Error("Method not implemented.");
  }
  create(data: VertificationCodeCreateDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: VertificationCodeUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, isHard?: boolean): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
