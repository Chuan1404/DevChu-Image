import { EModelStatus } from "../../share/enums";

export type RefreshToken = {
  id: string;
  token: string;
  expireDate: Date;
  status: EModelStatus;

  userId: string;

  createdAt: Date;
  updatedAt: Date;
};

export type RefreshTokenCreateDTO = {
  token: string;
  userId: string;
};

export type RefreshTokenUpdateDTO = {
  token?: string;
  userId?: string;
  status?: EModelStatus;
};

export type RefreshTokenCondDTO = {
  userId?: string;
  status?: EModelStatus;
};
