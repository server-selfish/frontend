import { queryOptions } from "@tanstack/react-query";
import { fetchActiveDeploymentContainerStatusByName } from "./container.get.api";
import { GLOBAL_REFETCH_INTERVAL } from "@/const/request";

export const containerStatusQueryOptions = (name?: string | null) =>
  queryOptions({
    queryKey: ["container-status", name],
    queryFn: () =>
      fetchActiveDeploymentContainerStatusByName({ data: name ?? "" }),
    enabled: !!name,
    refetchInterval: GLOBAL_REFETCH_INTERVAL,
  });
