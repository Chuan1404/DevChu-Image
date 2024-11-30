import { EAccountStatus, EModelStatus, EUserRole } from "../../share/enums";

export const modelName = "User"

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  status: EModelStatus;
  accountStatus: EAccountStatus;
  role: EUserRole;
  createdAt: Date;
  updatedAt: Date;
};