import { EModelStatus } from "../../share/enums";

export type Comment = {
  id: string;
  content: string;

  userId: string;
  fileId: string;
  
  status: EModelStatus;

  createdDate: Date;
  updatedDate: Date;
}

export type CommentCreateDTO = {
  content: string;
  userId: string;
  fileId: string;
}

export type CommentUpdateDTO = {
  content?: string;
  status?: EModelStatus
}

export type CommentCondDTO = {
  content?: string;
  status?: EModelStatus
  userId?: string;
  fileId?: string;
}