import { EAccountState, EModelStatus, EUserRole } from "../../share/enums";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  status: EModelStatus;

  state: EAccountState;
  role: EUserRole;

  createdDate: Date;
  updatedDate: Date;
};

export type UserCreateDTO = {
  email: string;
  password: string;
  name: string;
  avatar: string;
};

export type UserUpdateDTO = {
  name?: string;
  state?: EAccountState;
  role?: EUserRole;
  status?: EModelStatus;
};

export type UserCondDTO = {
  email?: string;
  name?: string;
  state?: EAccountState;
  role?: EUserRole;
  status?: EModelStatus;
};
