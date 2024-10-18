import { EModelStatus } from "../../share/enums";

export type Tag = {
  id: string;
  name: string;
  status: EModelStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type TagCreateDTO = {
  name: string;
};

export type TagUpdateDTO = {
  name?: string;
  status?: EModelStatus;
};

export type TagCondDTO = {
  name?: string;
  status?: EModelStatus;
};
