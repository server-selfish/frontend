import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import axios from "redaxios";

export const projectsQueryOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

export const fetchProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<Project[]> => {
    return axios
      .get<Project[]>("http://localhost:8081/project")
      .then((response) => response.data)
      .catch(() => {
        throw new Error("Failed to fetch projects");
      });
  }
);

export const projectQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["projects", id],
    queryFn: () => fetchProjectById({ data: id }),
  });

export const fetchProjectById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async (id): Promise<Project> => {
    return axios
      .get<Project>("http://localhost:8081/project/" + id)
      .then((response) => response.data)
      .catch(() => {
        throw new Error("Failed to fetch project");
      });
  });
