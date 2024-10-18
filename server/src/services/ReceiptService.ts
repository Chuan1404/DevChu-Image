import {
  Receipt,
  ReceiptCondDTO,
  ReceiptCreateDTO,
  ReceiptUpdateDTO,
} from "../models/types/Receipt";
import { PagingDTO } from "../share/types";
import { IReceiptService } from "./interfaces/IReceiptService";

export class ReceiptService implements IReceiptService {
  find(id: string): Promise<Receipt> {
    throw new Error("Method not implemented.");
  }
  findAll(cond: ReceiptCondDTO, paging: PagingDTO): Promise<Receipt[]> {
    throw new Error("Method not implemented.");
  }
  create(data: ReceiptCreateDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: ReceiptUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, isHard?: boolean): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
