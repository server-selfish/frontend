import { mutationOptions } from "@tanstack/react-query";
import { createProjectSchemaInfered } from "@/schemas/project";
import { createProject } from "./project.post.api";

export const createProjectMutation = () =>
  mutationOptions({
    mutationFn: (input: createProjectSchemaInfered) =>
      createProject({ data: input }),
  });
