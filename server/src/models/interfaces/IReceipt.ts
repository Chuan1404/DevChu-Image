import { EModelStatus, EPaymentMethod } from "../../share/enums";
import { IFileUploaded } from "./IFileUploaded";
import { IUser } from "./IUser";

export const modelName = "Receipt"

export interface IReceipt {
  id: string;
  totalPrice: number;
  method: EPaymentMethod;
  methodId?: string;
  status: EModelStatus;
  userId: IUser;
  fileId: IFileUploaded;
  createdAt: Date;
  updatedAt: Date;
};