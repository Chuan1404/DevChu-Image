import { EFileType, EModelStatus } from "../../share/enums";
import { IUser } from "./IUser";

export const modelName = "UploadedFile"

export interface IUploadedFile {
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
  userId: IUser;
  status: EModelStatus;
  fileType: EFileType;
  createdAt: Date;
  updatedAt: Date;
};