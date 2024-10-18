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
  user: IUser;
  file: IFileUploaded;
  createdDate: Date;
  updatedDate: Date;
};