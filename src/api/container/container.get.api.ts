import { createServerFn } from "@tanstack/react-start";
import { createApiClient } from "@/lib/request";
import {
  ContainerStatusResponseSchema,
  ContainerStatusType,
} from "@/schemas/container";

export const fetchActiveDeploymentContainerStatusByName = createServerFn({
  method: "GET",
})
  .inputValidator((name: string) => name)
  .handler(async (name): Promise<ContainerStatusType> => {
    const ac = createApiClient();
    const data = await ac.get(`/container/status/${name.data}`);
    return ContainerStatusResponseSchema.parse(data);
  });
