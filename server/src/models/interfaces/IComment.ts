import { EModelStatus } from "../../share/enums";
import { IUploadedFile } from "./IUploadedFile";
import { IUser } from "./IUser";

export const modelName = "Comment"

 export interface IComment {
  id: string;
  content: string;
  userId: IUser;
  fileId: IUploadedFile;
  status: EModelStatus;
  createdAt: Date;
  updatedAt: Date;
}