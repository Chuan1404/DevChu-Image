import { EModelStatus, EPaymentMethod } from "../../share/enums";
import { IUploadedFile } from "./IUploadedFile";
import { IUser } from "./IUser";

export const modelName = "Receipt"

export interface IReceipt {
  id: string;
  totalPrice: number;
  method: EPaymentMethod;
  methodId?: string;
  status: EModelStatus;
  userId: IUser;
  fileId: IUploadedFile;
  createdAt: Date;
  updatedAt: Date;
};