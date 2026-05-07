import { queryOptions } from "@tanstack/react-query";
import { fetchActiveDeploymentContainerStatusByName } from "./container.get.api";

export const containerStatusQueryOptions = (name?: string | null) =>
  queryOptions({
    queryKey: ["container-status", name],
    queryFn: () =>
      fetchActiveDeploymentContainerStatusByName({ data: name ?? "" }),
    enabled: !!name,
  });
