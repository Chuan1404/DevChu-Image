import { EModelStatus } from "../../share/enums";
import { IFileUploaded } from "./IFileUploaded";
import { IUser } from "./IUser";

export const modelName = "UserRight"

export interface IUserRight {
  id: string;
  expireDate: Date;
  fileId: IFileUploaded;
  userId: IUser;
  status: EModelStatus;
  createdAt: Date;
  updatedAt: Date;
}
