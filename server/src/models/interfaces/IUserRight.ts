import { EModelStatus } from "../../share/enums";
import { IUploadedFile } from "./IUploadedFile";
import { IUser } from "./IUser";

export const modelName = "UserRight"

export interface IUserRight {
  id: string;
  expireDate: Date;
  fileId: IUploadedFile;
  userId: IUser;
  status: EModelStatus;
  createdAt: Date;
  updatedAt: Date;
}
