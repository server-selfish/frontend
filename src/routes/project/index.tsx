import { projectsQueryOptions } from "@/api/project/project.get";
import ErrorCard from "@/components/card/ErrorCard";
import ProjectDefault from "@/features/project/ProjectDefault";
import { ProjectEmpty } from "@/features/project/ProjectEmpty";
import { createFileRoute } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/project/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    try {
      // const data = await context.queryClient.ensureQueryData(
      //   projectsQueryOptions()
      // );
      // return data;
      return [{ id: "1", name: "asd", description: "asd" }];
      // return [];
    } catch (error: any) {
      return { error: error.message };
    }
  },
});

function RouteComponent() {
  const projects = Route.useLoaderData();
  const isProjectAnArray = Array.isArray(projects);
  if (!isProjectAnArray && projects.error) {
    return (
      <div className="w-full h-[93vh] flex justify-center items-center">
        <ErrorCard message={projects.error} />
      </div>
    );
  }

  if (isProjectAnArray && projects.length === 0) {
    return (
      <div className="w-full h-[93vh] flex justify-center items-center">
        <ProjectEmpty />
      </div>
    );
  }
  return (
    <div className="flex flex-col pt-2">
      <div className="mb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Badge
                  variant="outline"
                  className="bg-green-phthalo text-xl text-white px-4"
                >
                  Project
                </Badge>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ProjectDefault projects={projects} />
    </div>
  );
}
