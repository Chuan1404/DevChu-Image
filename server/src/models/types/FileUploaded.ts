import { EFileType, EModelStatus } from "../../share/enums";

export type FileUploaded = {
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
  userId: string;

  status: EModelStatus;
  fileType: EFileType;

  createdAt: Date;
  updatedAt: Date;
};

export type FileUploadedCreateDTO = {
  title: string;
  price: number;
  root: string;
  display: string;
  medium: string;
  high: string;
  size: number;
  width: number;
  height: number;
  fileType: EFileType;
};

export type FileUploadedUpdateDTO = {
  title?: string;
  price?: number;
  userId?: string;
  status?: EModelStatus;
};

export type FileUploadedCondDTO = {
  title?: string;
  price?: number;
  size?: number;
  width?: number;
  height?: number;
  userId?: string;
  status?: EModelStatus;
  fileType?: EFileType;
};
