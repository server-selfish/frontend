import { z } from "zod/v3";

export const ProjectRouteSearchSchema = z.object({
  project: z.string().optional(),
});
export type ProjectRouteSearchSchemaType = z.infer<
  typeof ProjectRouteSearchSchema
>;
