import { z } from "zod/v4";
import { makeDataSchema } from ".";
import { portNumberSchema } from "./deployment";

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

const ProjectDeploymentDetail = z.object({
  deployment_name: z.string().nullable().optional(),
  deployment_url: z.string().nullable().optional(),
  deployment_created_at: z.string().nullable().optional(),
  deployment_updated_at: z.string().nullable().optional(),
  deployment_branch: z.string().nullable().optional(),
  deployment_version: z.string().nullable().optional(),
  deployment_commit_msg: z.string().nullable().optional(),
  deployment_port: z
    .array(
      z.object({
        external: portNumberSchema,
        internal: portNumberSchema,
        protocol: z.string(),
      })
    )
    .nullable()
    .optional(),
  deployment_history_created_at: z.string().nullable().optional(),
  techstack_name: z.string().nullable().optional(),
  techstack_version: z.string().nullable().optional(),
  container_name: z.string().nullable().optional(),
});

export type ProjectDeploymentDetailType = z.infer<
  typeof ProjectDeploymentDetail
>;

export const ProjectDetailDefault = z.object({
  project_name: z.string(),
  project_description: z.string().nullable().optional(),
  project_created_at: z.string(),
  project_updated_at: z.string().nullable().optional(),
  deployments: z.array(ProjectDeploymentDetail).nullable(),
});

export const ProjectDetailSchema = makeDataSchema(ProjectDetailDefault);
export type ProjectDetailType = z.infer<typeof ProjectDetailDefault>;

export const createProjectSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  description: z.string(),
});

export type createProjectSchemaInfered = z.infer<typeof createProjectSchema>;
