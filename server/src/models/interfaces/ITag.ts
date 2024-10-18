import { EModelStatus } from "../../share/enums";


export const modelName = "Tag"

export interface ITag {
  id: string;
  name: string;
  status: EModelStatus;
  createdDate: Date;
  updatedDate: Date;
};
