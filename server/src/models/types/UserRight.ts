import { EModelStatus } from "../../share/enums";

export type UserRight = {
  id: string;
  expireDate: Date;
  fileId: string;
  userId: string;
  createdDate: Date;
  updatedDate: Date;
  status: EModelStatus;
};

export type UserRightCreateDTO = {
  expireDate: Date;
  fileId: string;
  userId: string;
};

export type UserRightUpdateDTO = {
  expireDate?: Date;
  status?: EModelStatus;
};

export type UserRightCondDTO = {
  fileId?: string;
  userId?: string;
  status?: EModelStatus;
};
