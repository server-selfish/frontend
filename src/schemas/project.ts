import { z } from "zod/v3";
import { makeDataSchema } from ".";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.string(),
});
export const ProjectArraySchema = makeDataSchema(z.array(ProjectSchema));

export type Project = z.infer<typeof ProjectSchema>;

export const createProjectSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  description: z.string(),
});

export type createProjectSchemaInfered = z.infer<typeof createProjectSchema>;
