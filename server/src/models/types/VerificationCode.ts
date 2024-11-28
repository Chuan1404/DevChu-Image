import { date, nativeEnum, object, string, z } from "zod";
import { EModelStatus } from "../../share/enums";

export const VerificationCodeSchema = object({
  id: string(),
  value: string(),
  userId: string(),
  status: nativeEnum(EModelStatus).default(EModelStatus.ACTIVE),
  createdAt: date(),
  updatedAt: date(),
});

export const VerificationCodeCreateSchema = object({
  value: string(),
  userId: string(),
});

export const VerificationCodeUpdateSchema = object({
  value: string().optional(),
  status: nativeEnum(EModelStatus).optional(),
});

export const VerificationCodeCondSchema = object({
  value: string().optional(),
  userId: string().optional(),
  status: nativeEnum(EModelStatus).optional(),
});

export type VerificationCode = z.infer<typeof VerificationCodeSchema>;
export type VerificationCodeCreateDTO = z.infer<
  typeof VerificationCodeCreateSchema
>;
export type VerificationCodeUpdateDTO = z.infer<
  typeof VerificationCodeUpdateSchema
>;
export type VerificationCodeCondDTO = z.infer<
  typeof VerificationCodeCondSchema
>;
