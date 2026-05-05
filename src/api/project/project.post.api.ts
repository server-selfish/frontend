import { createApiClient } from "@/lib/request";
import { createProjectSchemaInfered } from "@/schemas/project";
import { createServerFn } from "@tanstack/react-start";

export const createProject = createServerFn({ method: "POST" })
  .inputValidator((input: createProjectSchemaInfered) => input)
  .handler(async (input) => {
    try {
      const ac = createApiClient();
      await ac.post("/project", input.data);
    } catch {
      throw new Error("Failed to create project");
    }
  });
