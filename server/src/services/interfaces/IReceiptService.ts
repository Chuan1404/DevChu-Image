import {
    Receipt,
    ReceiptCondDTO,
    ReceiptCreateDTO,
    ReceiptUpdateDTO,
  } from "../../models/types/Receipt";
  import { IService } from "../../share/interfaces/IService";
  
  export interface IReceiptService
    extends IService<Receipt, ReceiptCondDTO, ReceiptCreateDTO, ReceiptUpdateDTO> {}
  