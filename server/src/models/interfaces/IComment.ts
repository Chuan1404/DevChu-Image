import { EModelStatus } from "../../share/enums";
import { IFileUploaded } from "./IFileUploaded";
import { IUser } from "./IUser";

export const modelName = "Comment"

export interface IComment {
  id: string;
  content: string;
  user: IUser;
  file: IFileUploaded;
  status: EModelStatus;
  createdDate: Date;
  updatedDate: Date;
}