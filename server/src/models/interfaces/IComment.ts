import { EModelStatus } from "../../share/enums";
import { IFileUploaded } from "./IFileUploaded";
import { IUser } from "./IUser";

export const modelName = "Comment"

export interface IComment {
  id: string;
  content: string;
  userId: IUser;
  fileId: IFileUploaded;
  status: EModelStatus;
  createdAt: Date;
  updatedAt: Date;
}