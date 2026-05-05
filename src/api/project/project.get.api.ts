import { createServerFn } from "@tanstack/react-start";
import { ZodError } from "zod/v3";
import { createApiClient, isHttpError } from "@/lib/request";
import { Project, ProjectArraySchema, ProjectSchema } from "@/schemas/project";

export const fetchProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<Project[] | null> => {
    try {
      const ac = createApiClient();
      const data = await ac.get("/project");
      return ProjectArraySchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      if (isHttpError(error) && error.status == 404) {
        return null;
      }
      throw new Error("Failed to fetch project");
    }
  }
);

export const fetchProjectById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async (id): Promise<Project> => {
    try {
      const ac = createApiClient();
      const data = await ac.get(`/project/${id}`);
      return ProjectSchema.parse(data);
    } catch {
      throw new Error("Failed to fetch projects");
    }
  });
