import { queryOptions } from "@tanstack/react-query";
import {
  fetchDeploymentByProjectId,
  fetchInstallationList,
  fetchInstallationRepositories,
  fetchInstalLink,
  fetchTechstack,
  fetchTechstackVersion,
} from "./deployment.get.api";

export const deploymentQueryOptions = (projectId: string) =>
  queryOptions({
    queryKey: ["deployments", projectId],
    queryFn: () => fetchDeploymentByProjectId({ data: projectId }),
    enabled: !!projectId,
  });

export const githubInstalLinkQueryOption = () =>
  queryOptions({
    queryKey: ["github-app-instal-link"],
    queryFn: () => fetchInstalLink(),
    enabled: false,
  });

export const githubInstallationListQueryOption = () =>
  queryOptions({
    queryKey: ["github-app-installation"],
    queryFn: () => fetchInstallationList(),
  });

export const githubInstallationRepositoriesQueryOption = (
  installationId: string
) =>
  queryOptions({
    queryKey: ["github-app-installation-repositories", installationId],
    queryFn: () => fetchInstallationRepositories({ data: installationId }),
    enabled: !!installationId,
  });

export const techstackQueryOption = () =>
  queryOptions({
    queryKey: ["techstack"],
    queryFn: () => fetchTechstack(),
  });

export const techstackVersionQueryOption = (techstackName: string) =>
  queryOptions({
    queryKey: ["techstack-version", techstackName],
    queryFn: () => fetchTechstackVersion({ data: techstackName }),
    enabled: !!techstackName,
  });
