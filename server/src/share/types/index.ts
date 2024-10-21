import { z } from "zod";

export const PagingSchema = z.object({
  limit: z.coerce.number().int().min(1).default(10),
  page: z.coerce.number().int().min(1).default(1),
});
export type PagingDTO = z.infer<typeof PagingSchema>;