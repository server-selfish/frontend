import { createApiClient } from "@/lib/request";
import {
  ContainerStatusDefaultSchema,
  ContainerStatusType,
} from "@/schemas/container";
import { createServerFn } from "@tanstack/react-start";
import { ZodError } from "zod";

export const fetchActiveDeploymentContainerStatusByName = createServerFn({
  method: "GET",
})
  .inputValidator((name: string) => name)
  .handler(async (name): Promise<ContainerStatusType> => {
    try {
      const ac = createApiClient();
      const data = await ac.get(`/container/status/${name.data}`);
      return ContainerStatusDefaultSchema.parse(data);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new Error(error.toString());
      }
      throw new Error("Failed to fetch projects");
    }
  });
