import { EModelStatus } from "../../share/enums";
import { IUser } from "./IUser";

export const modelName = "VertificationCode"

export type IVertificationCode = {
  id: string;
  value: string;
  user: IUser;
  status: EModelStatus;
  createdDate: Date;
  updatedDate: Date;
};