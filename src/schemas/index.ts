import { ZodTypeAny, z } from "zod/v4";

export const makeDataSchema = <T extends ZodTypeAny>(dataSchema: T) =>
  z
    .object({
      message: z.string(),
      data: dataSchema.optional(),
      error: z.unknown().optional(),
    })
    .transform((val) => val.data ?? null);
