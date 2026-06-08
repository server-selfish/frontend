import { createServerFn } from "@tanstack/react-start";
import { createApiClient } from "@/lib/request";
import {
  Project,
  ProjectArraySchema,
  ProjectDetailSchema,
  ProjectDetailType,
  ProjectSchema,
  ProjectSidebarSchema,
  ProjectSidebarType,
} from "@/schemas/project";

export const fetchProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<Project[] | null> => {
    const ac = createApiClient();
    const data = await ac.get("/project");
    return ProjectArraySchema.parse(data);
  }
);

export const fetchProjectByName = createServerFn({ method: "GET" })
  .inputValidator((name: string) => name)
  .handler(async (d): Promise<ProjectSidebarType | null> => {
    const ac = createApiClient();
    const data = await ac.get(`/project/${d.data}`);
    return ProjectSidebarSchema.parse(data);
  });

export const fetchProjectByNameDetail = createServerFn({ method: "GET" })
  .inputValidator((name: string) => name)
  .handler(async (d): Promise<ProjectDetailType | null> => {
    const ac = createApiClient();
    const data = await ac.get(`/project/detail/${d.data}`);
    return ProjectDetailSchema.parse(data);
  });

export const fetchProjectById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async (id): Promise<Project | null> => {
    const ac = createApiClient();
    const data = await ac.get(`/project/${id}`);
    return ProjectSchema.parse(data);
  });
