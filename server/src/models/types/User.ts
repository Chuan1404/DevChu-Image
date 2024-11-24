import { array, date, nativeEnum, object, string, z } from "zod";
import { EAccountStatus, EModelStatus, EUserRole } from "../../share/enums";

export const UserSchema = z.object({
  id: string(),
  email: string(),
  password: string(),
  name: string(),
  avatar: string(),
  status: nativeEnum(EModelStatus).default(EModelStatus.ACTIVE),

  accountStatus: z
    .nativeEnum(EAccountStatus)
    .default(EAccountStatus.UNVERIFIED),
  role: nativeEnum(EUserRole).default(EUserRole.ROLE_CUSTOMER),

  createdAt: date(),
  updatedAt: date(),
});

export const UserCreateSchema = object({
  email: string(),
  password: string(),
  name: string(),
  role: nativeEnum(EUserRole).default(EUserRole.ROLE_CUSTOMER),
  // avatar: string(),
});

export const UserUpdateSchema = object({
  email: string().optional(),
  accountStatus: nativeEnum(EAccountStatus).optional(),
  role: nativeEnum(EUserRole).optional(),
  status: nativeEnum(EModelStatus).optional(),
});

export const UserCondSchema = object({
  id: object({ $in: array(string()) }).optional(),
  email: string().optional(),
  name: string().optional(),
  accountStatus: nativeEnum(EAccountStatus).optional(),
  role: nativeEnum(EUserRole).optional(),
  status: nativeEnum(EModelStatus).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type UserCreateDTO = z.infer<typeof UserCreateSchema>;
export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;
export type UserCondDTO = z.infer<typeof UserCondSchema>;
