import { projectByNameDetailQueryOptions } from "@/api";
import { Spinner } from "@/components/ui/spinner";
import ProjectByNameMainScreen from "@/features/project/ProjectByNameMainScreen";
import { ProjectByNameRouteSearchSchema } from "@/schemas/route";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/project/$projectname")({
  component: RouteComponent,
  validateSearch: ProjectByNameRouteSearchSchema,
  // loader: async ({ context, params: { projectname } }) => {
  //   try {
  //     const data = await context.queryClient.ensureQueryData(
  //       projectByNameDetailQueryOptions(projectname)
  //     );
  //     return data;
  //   } catch (error: unknown) {
  //     return { error: String(error) };
  //   }
  // },
});

function RouteComponent() {
  // const p = Route.useLoaderData();
  const { projectname } = Route.useParams();
  const { data: p, isLoading } = useQuery(
    projectByNameDetailQueryOptions(projectname)
  );
  return (
    <div className="flex flex-col py-4 px-2 min-h-0 h-full">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="text-white w-10 h-10" />
        </div>
      ) : (
        <ProjectByNameMainScreen project={p} />
      )}
    </div>
  );
}
