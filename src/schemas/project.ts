import * as z from "zod";
export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type createProjectSchemaInfered = z.infer<typeof createProjectSchema>;
