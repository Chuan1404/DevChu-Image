import { any, array, date, nativeEnum, number, object, string, z } from "zod";
import { EModelStatus } from "../../share/enums";

export const FileUploadedSchema = z.object({
  id: string().uuid(),
  title: string().min(2),
  price: number().min(0),
  root: string(),
  display: string(),
  medium: string(),
  high: string(),
  size: number().min(0),
  width: number().min(0),
  height: number().min(0),
  userId: string(),

  status: nativeEnum(EModelStatus),
  fileType: string(),

  createdAt: date(),
  updatedAt: date(),
});

export const FileUploadedCreateSchema = object({
  title: string().min(2),
  price: number().min(0),
  file: any(),
  userId: string(),
});

export const FileUploadedUpdateSchema = object({
  title: string().min(2).optional(),
  price: number().min(0).optional(),
  status: nativeEnum(EModelStatus).optional(),
});

export const FileUploadedCondSchema = object({
  id: object({ $in: array(string()) }).optional(),
  title: string().optional(),
  price: number().optional(),
  size: number().min(0).optional(),
  width: number().min(0).optional(),
  height: number().min(0).optional(),
  userId: string().optional(),
  status: nativeEnum(EModelStatus).optional(),
  fileType: string().optional(),
});

export type FileUploaded = z.infer<typeof FileUploadedSchema>;
export type FileUploadedCreateDTO = z.infer<typeof FileUploadedCreateSchema>;
export type FileUploadedUpdateDTO = z.infer<typeof FileUploadedUpdateSchema>;
export type FileUploadedCondDTO = z.infer<typeof FileUploadedCondSchema>;
