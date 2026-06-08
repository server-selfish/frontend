import { z } from "zod/v4";

export const ProjectRouteSearchSchema = z.object({
  project: z.string().optional(),
});

export const ProjectByNameRouteSearchSchema = z.object({
  step: z.number().optional(),
});

export type ProjectByNameRouteSearchSchemaType = z.infer<
  typeof ProjectByNameRouteSearchSchema
>;

export type ProjectRouteSearchSchemaType = z.infer<
  typeof ProjectRouteSearchSchema
>;
