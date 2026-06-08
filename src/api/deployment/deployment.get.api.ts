import { createServerFn } from "@tanstack/react-start";
import { createApiClient } from "@/lib/request";
import {
  Deployment,
  DeploymentSchema,
  GithubInstalLinkResponseSchema,
  GithubInstalLinkResponseType,
  GithubInstallationListResponseSchema,
  GithubInstallationListType,
  GithubInstallationRepositoryResponseSchema,
  GithubInstallationRepositoryType,
  TechstackResponseSchema,
  TechstackType,
  TechstackVersionResponseSchema,
  TechstackVersionType,
} from "@/schemas/deployment";

export const fetchDeploymentByProjectId = createServerFn({ method: "GET" })
  .inputValidator((projectId: string) => projectId)
  .handler(async (projectId): Promise<Deployment | null> => {
    const ac = createApiClient();
    const data = await ac.get(`/deployment?projectId=${projectId}`);
    return DeploymentSchema.parse(data);
  });

export const fetchInstalLink = createServerFn({ method: "GET" }).handler(
  async (): Promise<GithubInstalLinkResponseType | null> => {
    const ac = createApiClient();
    const data = await ac.get("/github-app/install");
    return GithubInstalLinkResponseSchema.parse(data);
  }
);

export const fetchInstallationList = createServerFn({ method: "GET" }).handler(
  async (): Promise<GithubInstallationListType[] | null> => {
    const ac = createApiClient();
    const data = await ac.get("/github-app/installations");
    return GithubInstallationListResponseSchema.parse(data);
  }
);

export const fetchInstallationRepositories = createServerFn({
  method: "GET",
})
  .inputValidator((installationId: string) => installationId)
  .handler(
    async (
      installationId
    ): Promise<GithubInstallationRepositoryType[] | null> => {
      const ac = createApiClient();
      const data = await ac.get(
        `/github-app/installations/${installationId.data}/repos`
      );
      return GithubInstallationRepositoryResponseSchema.parse(data);
    }
  );

export const fetchTechstack = createServerFn({
  method: "GET",
}).handler(async (): Promise<TechstackType | null> => {
  const ac = createApiClient();
  const data = await ac.get("/deployment/techstack");
  return TechstackResponseSchema.parse(data);
});

export const fetchTechstackVersion = createServerFn({
  method: "GET",
})
  .inputValidator((techstackName: string) => techstackName)
  .handler(async (techstackName): Promise<TechstackVersionType[] | null> => {
    const ac = createApiClient();
    const data = await ac.get(
      `/deployment/techstack/${techstackName.data}/version`
    );
    return TechstackVersionResponseSchema.parse(data);
  });
