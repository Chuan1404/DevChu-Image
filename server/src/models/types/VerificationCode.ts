import { z } from "zod";
import { EModelStatus } from "../../share/enums";


export const VerificationCodeSchema = z.object({
  id: z.string(),
  value: z.string(),
  userId: z.string(),
  status: z.nativeEnum(EModelStatus).default(EModelStatus.ACTIVE),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const VerificationCodeCreateSchema = z.object({
  value: z.string(),
  userId: z.string(),
})

export const VerificationCodeUpdateSchema = z.object({
  value: z.string().optional(),
  status: z.nativeEnum(EModelStatus).optional(),
})

export const VerificationCodeCondSchema = z.object({
  value: z.string().optional(),
  userId: z.string().optional(),
  status: z.nativeEnum(EModelStatus).optional(),
})



export type VerificationCode = z.infer<typeof VerificationCodeSchema>
export type VerificationCodeCreateDTO = z.infer<typeof VerificationCodeCreateSchema>
export type VerificationCodeUpdateDTO = z.infer<typeof VerificationCodeUpdateSchema>
export type VerificationCodeCondDTO = z.infer<typeof VerificationCodeCondSchema>