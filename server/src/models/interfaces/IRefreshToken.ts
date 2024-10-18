import { EModelStatus } from "../../share/enums";
import { IUser } from "./IUser";

export const modelName = "RefreshToken"

export interface IRefreshToken {
  id: string;
  token: string;
  expireDate: Date;
  status: EModelStatus;
  user: IUser;
  createdDate: Date;
  updatedDate: Date;
};