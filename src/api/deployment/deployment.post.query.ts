import { CreateDeploymentSubmitSchemaType } from "@/schemas/deployment";
import { createDeployment } from "./deployment.post.api";
import { mutationOptions } from "@tanstack/react-query";

export const createDeploymentMutation = () =>
  mutationOptions({
    mutationFn: (input: CreateDeploymentSubmitSchemaType) =>
      createDeployment({ data: input }),
  });
