import { EFileType, EModelStatus } from "../../share/enums";
import { IUser } from "./IUser";

export const modelName = "FileUploaded"

export interface IFileUploaded {
  id: string;
  title: string;
  price: number;
  root: string;
  display: string;
  medium: string;
  high: string;
  size: number;
  width: number;
  height: number;
  user: IUser;
  status: EModelStatus;
  fileType: EFileType;
  createdAt: Date;
  updatedAt: Date;
};