import { createFileRoute } from "@tanstack/react-router";
import { projectsQueryOptions } from "@/api";
import ProjectDefault from "@/features/project/ProjectDefault";
import { ProjectEmpty } from "@/features/project/ProjectEmpty";
import { ZodError } from "zod/v3";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { Toast } from "@/components";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_protected/project/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    try {
      const data = await context.queryClient.ensureQueryData(
        projectsQueryOptions()
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return { error: error.toString() };
      }
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: String(error) };
    }
  },
});

function RouteComponent() {
  const projects = Route.useLoaderData();

  const initialData = Array.isArray(projects) ? projects : null;

  const { data } = useQuery({
    ...projectsQueryOptions(),
    initialData,
  });
  const isProjectAnArray = Array.isArray(data);

  const errorMessage =
    !Array.isArray(projects) && projects?.error ? projects.error : null;
  const prevErrorRef = useRef<string | null>(null);

  useEffect(() => {
    if (errorMessage && prevErrorRef.current !== errorMessage) {
      toast(<Toast type="info" message={errorMessage} />);
      prevErrorRef.current = errorMessage;
    }
  }, [errorMessage]);

  if (isProjectAnArray && data.length === 0) {
    return (
      <div className="w-full h-[93vh] flex justify-center items-center">
        <ProjectEmpty />
      </div>
    );
  }
  return (
    <div className="flex flex-col py-4 px-2 min-h-0 h-full">
      <ProjectDefault projects={data} />
    </div>
  );
}
