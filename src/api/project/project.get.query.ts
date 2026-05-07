import { queryOptions } from "@tanstack/react-query";
import {
  fetchProjectById,
  fetchProjectByName,
  fetchProjects,
} from "./project.get.api";

export const projectsQueryOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

export const projectByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["project-by-id", id],
    queryFn: () => fetchProjectById({ data: id }),
  });

export const projectByNameQueryOptions = (name: string) =>
  queryOptions({
    queryKey: ["project-by-name", name],
    queryFn: () => fetchProjectByName({ data: name }),
    enabled: !!name,
  });
