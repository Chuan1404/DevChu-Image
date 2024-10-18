import { z } from "zod";

export const PagingSchema = z.object({
  limit: z.number().int().min(10).default(10),
  page: z.number().int().min(1).default(1),
});

export type PagingDTO = z.infer<typeof PagingSchema>;
