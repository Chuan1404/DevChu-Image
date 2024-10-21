import { EModelStatus } from "../../share/enums";
import { IUser } from "./IUser";

export const modelName = "VerificationCode";

export interface IVerificationCode {
  id: string;
  value: string;
  userId: IUser;
  status: EModelStatus;
  createdAt: Date;
  updatedAt: Date;
}
