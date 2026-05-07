import { createServerFn } from "@tanstack/react-start";
import { ZodError } from "zod/v3";
import { createApiClient, isHttpError } from "@/lib/request";
import {
  Project,
  ProjectArraySchema,
  ProjectSchema,
  ProjectSidebarSchema,
  ProjectSidebarType,
} from "@/schemas/project";

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

export const fetchProjectByName = createServerFn({ method: "GET" })
  .inputValidator((name: string) => name)
  .handler(async (d): Promise<ProjectSidebarType | null> => {
    try {
      const ac = createApiClient();
      const data = await ac.get(`/project/${d.data}`);
      return ProjectSidebarSchema.parse(data);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new Error(error.toString());
      }
      throw new Error("Failed to fetch projects");
    }
  });

export const fetchProjectById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async (id): Promise<Project | null> => {
    try {
      const ac = createApiClient();
      const data = await ac.get(`/project/${id}`);
      return ProjectSchema.parse(data);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new Error(error.toString());
      }
      throw new Error("Failed to fetch projects");
    }
  });
