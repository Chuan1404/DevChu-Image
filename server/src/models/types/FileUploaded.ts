import { z } from "zod";
import { EFileType, EModelStatus } from "../../share/enums";

export const FileUploadedSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2),
  price: z.number().min(0),
  root: z.string(),
  display: z.string(),
  medium: z.string(),
  high: z.string(),
  size: z.number().min(0),
  width: z.number().min(0),
  height: z.number().min(0),
  userId: z.string(),

  status: z.nativeEnum(EModelStatus),
  fileType: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const FileUploadedCreateSchema = z.object({
  title: z.string().min(2),
  price: z.number().min(0),
  file: z.any(),
  userId: z.string(),
});

export const FileUploadedUpdateSchema = z.object({
  title: z.string().min(2).optional(),
  price: z.number().min(0).optional(),
  status: z.nativeEnum(EModelStatus).optional(),
});

export const FileUploadedCondSchema = z.object({
  id: z.object({ $in: z.array(z.string()) }).optional(),
  title: z.string().optional(),
  price: z.number().optional(),
  size: z.number().min(0).optional(),
  width: z.number().min(0).optional(),
  height: z.number().min(0).optional(),
  userId: z.string().optional(),
  status: z.nativeEnum(EModelStatus).optional(),
  fileType: z.string().optional(),
});

export type FileUploaded = z.infer<typeof FileUploadedSchema>;
export type FileUploadedCreateDTO = z.infer<typeof FileUploadedCreateSchema>;
export type FileUploadedUpdateDTO = z.infer<typeof FileUploadedUpdateSchema>;
export type FileUploadedCondDTO = z.infer<typeof FileUploadedCondSchema>;
