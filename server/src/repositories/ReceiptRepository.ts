import { modelName } from "../models/interfaces/IReceipt";
import {
  Receipt,
  ReceiptCondDTO,
  ReceiptUpdateDTO,
} from "../models/types/Receipt";
import { MongoRepository } from "../share/components/MongoRepository";

export class ReceiptRepository extends MongoRepository<
  Receipt,
  ReceiptCondDTO,
  ReceiptUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
