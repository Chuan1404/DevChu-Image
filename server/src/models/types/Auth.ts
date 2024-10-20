import { z } from "zod";
import { EUserRole } from "../../share/enums";

export const AuthSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const AuthRefreshTokenSchema = z.object({
  token: z.string(),
});

export const AuthLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: z.nativeEnum(EUserRole).default(EUserRole.ROLE_CUSTOMER),
});

export const AuthRegisterSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.nativeEnum(EUserRole).default(EUserRole.ROLE_CUSTOMER),
});

export const AuthPayloadSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  role: z.nativeEnum(EUserRole),
});

export type Auth = z.infer<typeof AuthSchema>;
export type AuthRegisterDTO = z.infer<typeof AuthRegisterSchema>;
export type AuthLoginDTO = z.infer<typeof AuthLoginSchema>;
export type AuthRefreshTokenDTO = z.infer<typeof AuthRefreshTokenSchema>;
export type AuthPayloadDTO = z.infer<typeof AuthPayloadSchema>;
