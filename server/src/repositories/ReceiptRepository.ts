import { modelName } from "../models/interfaces/IReceipt";
import {
  Receipt,
  ReceiptCondDTO,
  ReceiptUpdateDTO,
} from "../models/types/Receipt";
import { PrismaRepository } from "../share/components/PrismaRepository";

export class ReceiptRepository extends PrismaRepository<
  Receipt,
  ReceiptCondDTO,
  ReceiptUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
