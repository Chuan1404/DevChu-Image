import { EModelStatus, EPaymentMethod } from "../../share/enums";

export type Receipt = {
  id: string;
  totalPrice: number;
  method: EPaymentMethod;
  methodId?: string;
  status: EModelStatus;

  userId: string;
  fileId: string;

  createdAt: Date;
  updatedAt: Date;
};

export type ReceiptCreateDTO = {
  totalPrice: number;
  method: EPaymentMethod;
  methodId: string;
  userId: string;
  fileId: string;
};

export type ReceiptUpdateDTO = {
  totalPrice?: number;
  status?: EModelStatus;
};

export type ReceiptCondDTO = {
  totalPrice?: number;
  method?: EPaymentMethod;
  methodId?: string;
  userId?: string;
  fileId?: string;
  status?: EModelStatus;
};
