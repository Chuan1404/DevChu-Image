import { z } from "zod";

export const GoogleAuthSchema = z.object({
  aud: z.string(),
  azp: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  exp: z.number(),
  family_name: z.string(),
  given_name: z.string(),
  iat: z.number(),
  iss: z.string(),
  jti: z.string(),
  name: z.string(),
  nbf: z.number(),
  picture: z.string(),
  sub: z.string(),
});

export type GoogleAuthDTO = z.infer<typeof GoogleAuthSchema>