import { date, nativeEnum, object, string, z } from "zod";
import { EModelStatus } from "../../share/enums";

export const TagSchema = object({
  id: string(),
  name: string(),
  status: nativeEnum(EModelStatus),
  createdAt: date(),
  updatedAt: date(),
});

export const TagCreateSchema = object({
  name: string(),
  status: nativeEnum(EModelStatus).default(EModelStatus.ACTIVE),
});

export const TagUpdateSchema = object({
  name: string().optional(),
  status: nativeEnum(EModelStatus).optional(),
});

export const TagCondSchema = object({
  name: string().optional(),
  status: nativeEnum(EModelStatus).optional(),
});

export type Tag = z.infer<typeof TagSchema>;
export type TagCreateDTO = z.infer<typeof TagCreateSchema>;
export type TagUpdateDTO = z.infer<typeof TagUpdateSchema>;
export type TagCondDTO = z.infer<typeof TagCondSchema>;
