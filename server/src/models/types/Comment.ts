import { z } from "zod";
import { EModelStatus } from "../../share/enums";
import { UploadedFile } from "./UploadedFile";
import { User } from "./User";

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),

  userId: z.string(),
  fileId: z.string(),

  status: z.nativeEnum(EModelStatus).default(EModelStatus.ACTIVE),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CommentCreateSchema = z.object({
  content: z.string(),
  userId: z.string(),
  fileId: z.string(),
});

export const CommentUpdateSchema = z.object({
  content: z.string().optional(),
  status: z.nativeEnum(EModelStatus),
});

export const CommentCondSchema = z.object({
  content: z.string().optional(),
  userId: z.string().optional(),
  fileId: z.string().optional(),
  status: z.nativeEnum(EModelStatus).optional(),
});

export type Comment = z.infer<typeof CommentSchema> & {
  user?: User | null;
  file?: UploadedFile | null;
};
export type CommentCreateDTO = z.infer<typeof CommentCreateSchema>;
export type CommentUpdateDTO = z.infer<typeof CommentUpdateSchema>;
export type CommentCondDTO = z.infer<typeof CommentCondSchema>;
