import { z } from "zod";
import { EAccountStatus, EModelStatus, EUserRole } from "../../share/enums";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  avatar: z.string(),
  status: z.nativeEnum(EModelStatus).default(EModelStatus.ACTIVE),

  accountStatus: z
    .nativeEnum(EAccountStatus)
    .default(EAccountStatus.UNVERIFIED),
  role: z.nativeEnum(EUserRole).default(EUserRole.ROLE_CUSTOMER),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserCreateSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  // avatar: z.string(),
});

export const UserUpdateSchema = z.object({
  email: z.string().optional(),
  accountStatus: z.nativeEnum(EAccountStatus).optional(),
  role: z.nativeEnum(EUserRole).optional(),
  status: z.nativeEnum(EModelStatus).optional(),
});

export const UserCondSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  accountStatus: z.nativeEnum(EAccountStatus).optional(),
  role: z.nativeEnum(EUserRole).optional(),
  status: z.nativeEnum(EModelStatus).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type UserCreateDTO = z.infer<typeof UserCreateSchema>;
export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;
export type UserCondDTO = z.infer<typeof UserCondSchema>;
