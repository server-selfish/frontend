import { queryOptions } from "@tanstack/react-query";
import { fetchProjectById, fetchProjects } from "./project.get.api";

export const projectsQueryOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

export const projectQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["project", id],
    queryFn: () => fetchProjectById({ data: id }),
  });
