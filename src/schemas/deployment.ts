import { z } from "zod/v4";
import { makeDataSchema } from ".";

export const DeploymentSchema = z.object({
  id: z.string(),
});

export type Deployment = z.infer<typeof DeploymentSchema>;

const GithubInstalLinkDefaultSchema = z.object({
  link: z.string(),
});

export const GithubInstalLinkResponseSchema = makeDataSchema(
  GithubInstalLinkDefaultSchema
);

export type GithubInstalLinkResponseType = z.infer<
  typeof GithubInstalLinkDefaultSchema
>;

export const GithubInstallationListDefaultSchema = z.object({
  installation_id: z.number(),
  account_login: z.string().nullable().optional(),
});

export const GithubInstallationListResponseSchema = makeDataSchema(
  z.array(GithubInstallationListDefaultSchema).nullable()
);

export type GithubInstallationListType = z.infer<
  typeof GithubInstallationListDefaultSchema
>;

export const portNumberSchema = z.coerce
  .number<number>({
    message: "Port is between 1-65535",
  })
  .int({
    message: "Port is between 1-65535",
  })
  .min(1, {
    message: "Port is between 1-65535",
  })
  .max(65535, {
    message: "Port is between 1-65535",
  });

export const CreateDeploymentSchema = z
  .object({
    deployment_name: z
      .string()
      .min(1, { message: "Deployment name is required" }),

    branch_name: z.string().min(1, { message: "Branch name is required" }),
    deployment_description: z.string(),
    installation_id: z.string().min(1, { message: "Account is required" }),
    repository_id: z.string().min(1, { message: "repository is required" }),
    build_command: z.string().optional(),
    build_folder: z.string().optional(),
    main_file_name: z
      .string()
      .min(0, { message: "Main file name is required" }),
    env: z.array(
      z.object({
        key: z.string().min(1, { message: "Key is required" }),
        value: z.string().min(1, { message: "Value is required" }),
      })
    ),
    port: z.array(
      z.object({
        external: portNumberSchema,
        internal: portNumberSchema,
        protocol: z
          .string()
          .transform((val) => val.toLowerCase())
          .pipe(
            z.enum(["tcp", "udp"], {
              message: "protocol need to be tcp or udp",
            })
          ),
      })
    ),
    techstack_name: z.string().min(1, { message: "techstack is required" }),
    techstack_version: z
      .string()
      .min(1, { message: "techstack version is required" }),
  })
  .superRefine((data, ctx) => {
    const isPython = data.techstack_name.toLowerCase() === "python";

    if (!isPython) {
      if (!data.build_command?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["build_command"],
          message: "build command is required",
        });
      }

      if (!data.build_folder?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["build_folder"],
          message: "build folder is required",
        });
      }
    }
  });

export type CreateDeploymentSchemaInputType = z.input<
  typeof CreateDeploymentSchema
>;
export type CreateDeploymentSchemaOutputType = z.output<
  typeof CreateDeploymentSchema
>;

const CreateDeploymentSubmitSchema = z.object({
  project_name: z.string().min(1, { message: "project name is required" }),
  deployment_name: z
    .string()
    .min(1, { message: "Deployment name is required" }),
  deployment_description: z.string(),
  installation_id: z.string().min(1, { message: "Account is required" }),
  repository_id: z.string().min(1, { message: "repository is required" }),
  branch_name: z.string().min(1, { message: "Branch name is required" }),
  build_command: z.string().optional(),
  build_folder: z.string().optional(),
  main_file_name: z.string().min(0, { message: "Main file name is required" }),
  env: z.array(
    z.object({
      key: z.string().min(1, { message: "Key is required" }),
      value: z.string().min(1, { message: "Value is required" }),
    })
  ),
  port: z.array(
    z.object({
      external: portNumberSchema,
      internal: portNumberSchema,
      protocol: z
        .string()
        .transform((val) => val.toLowerCase())
        .pipe(
          z.enum(["tcp", "udp"], {
            message: "protocol need to be tcp or udp",
          })
        ),
    })
  ),
  techstack_id: z.number(),
});

export type CreateDeploymentSubmitSchemaType = z.infer<
  typeof CreateDeploymentSubmitSchema
>;

export const GithubInstallationRepositoryDefaultSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean().nullable().optional(),
  html_url: z.string().nullable().optional(),
  clone_url: z.string().nullable().optional(),
  default_brunch: z.string().nullable().optional(),
});

export const GithubInstallationRepositoryResponseSchema = makeDataSchema(
  z.array(GithubInstallationRepositoryDefaultSchema)
);

export type GithubInstallationRepositoryType = z.infer<
  typeof GithubInstallationRepositoryDefaultSchema
>;

const TechstackDefaultSchema = z.object({
  name: z.array(z.string()),
});

export const TechstackResponseSchema = makeDataSchema(TechstackDefaultSchema);
export type TechstackType = z.infer<typeof TechstackDefaultSchema>;

const TechstackVersionDefaultSchema = z.object({
  id: z.number(),
  version: z.string(),
});

export const TechstackVersionResponseSchema = makeDataSchema(
  z.array(TechstackVersionDefaultSchema)
);

export type TechstackVersionType = z.infer<
  typeof TechstackVersionDefaultSchema
>;
