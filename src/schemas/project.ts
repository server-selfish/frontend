import { z } from "zod/v3";
import { makeDataSchema } from ".";

export const ProjectDefaultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.string(),
});
export const ProjectSchema = makeDataSchema(ProjectDefaultSchema);
export const ProjectArraySchema = makeDataSchema(z.array(ProjectDefaultSchema));

const ProjectDeploymentSummary = z.object({
  deployment_name: z.string().nullable().optional(),
  techstack_name: z.string().nullable().optional(),
  container_name: z.string().nullable().optional(),
});

export type ProjectDeploymentSummaryType = z.infer<
  typeof ProjectDeploymentSummary
>;

export const ProjectDefaultSidebar = z.object({
  project_name: z.string(),
  project_description: z.string().nullable().optional(),
  project_created_at: z.string(),
  project_updated_at: z.string().nullable().optional(),
  deployments: z.array(ProjectDeploymentSummary).nullable(),
});

export const ProjectSidebarSchema = makeDataSchema(ProjectDefaultSidebar);

export type ProjectSidebarType = z.infer<typeof ProjectDefaultSidebar>;
export type Project = z.infer<typeof ProjectDefaultSchema>;

export const createProjectSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  description: z.string(),
});

export type createProjectSchemaInfered = z.infer<typeof createProjectSchema>;
