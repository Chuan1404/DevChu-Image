import { any, array, date, nativeEnum, number, object, string, z } from "zod";
import { EModelStatus } from "../../share/enums";

export const UploadedFileSchema = z.object({
  id: string(),
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

export const UploadedFileCreateSchema = object({
  title: string().min(2),
  price: number().min(0),
  file: any(),
  userId: string(),
});

export const UploadedFileUpdateSchema = object({
  title: string().min(2).optional(),
  price: number().min(0).optional(),
  status: nativeEnum(EModelStatus).optional(),
});

export const UploadedFileCondSchema = object({
  id: array(string()).optional(),
  title: string().optional(),
  price: object({
    gte: number().min(0).optional(),
    lte: number().min(0).optional(),
  }).optional(),
  size: number().min(0).optional(),
  width: number().min(0).optional(),
  height: number().min(0).optional(),
  userId: string().optional(),
  status: nativeEnum(EModelStatus).optional(),
  fileType: array(string()).optional(),
});

export type UploadedFile = z.infer<typeof UploadedFileSchema>;
export type UploadedFileCreateDTO = z.infer<typeof UploadedFileCreateSchema>;
export type UploadedFileUpdateDTO = z.infer<typeof UploadedFileUpdateSchema>;
export type UploadedFileCondDTO = z.infer<typeof UploadedFileCondSchema>;
