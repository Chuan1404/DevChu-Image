import { z } from "zod";
import { EModelStatus } from "../../share/enums";

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.nativeEnum(EModelStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const TagCreateSchema = z.object({
  name: z.string(),
  status: z.nativeEnum(EModelStatus).default(EModelStatus.ACTIVE),
});

export const TagUpdateSchema = z.object({
  name: z.string().optional(),
  status: z.nativeEnum(EModelStatus).optional(),
});

export const TagCondSchema = z.object({
  name: z.string().optional(),
  status: z.nativeEnum(EModelStatus).optional(),
});

export type Tag = z.infer<typeof TagSchema>;
export type TagCreateDTO = z.infer<typeof TagCreateSchema>;
export type TagUpdateDTO = z.infer<typeof TagUpdateSchema>;
export type TagCondDTO = z.infer<typeof TagCondSchema>;
