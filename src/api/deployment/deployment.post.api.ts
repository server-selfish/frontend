import { createApiClient } from "@/lib/request";
import { CreateDeploymentSubmitSchemaType } from "@/schemas/deployment";
import { createServerFn } from "@tanstack/react-start";

export const createDeployment = createServerFn({ method: "POST" })
  .inputValidator((input: CreateDeploymentSubmitSchemaType) => input)
  .handler(async (input) => {
    const ac = createApiClient();
    await ac.post("/deployment", input.data);
  });
