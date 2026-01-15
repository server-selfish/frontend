import { projectQueryOptions } from "@/api/project/project.get";
import ErrorCard from "@/components/card/ErrorCard";
import ProjectByIdMainScreen from "@/features/project/ProjectByIdMainScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/project/$projectid")({
  loader: async ({ context, params: { projectid } }) => {
    try {
      // const data = await context.queryClient.ensureQueryData(
      //   projectQueryOptions(projectid)
      // );
      // return data;
      return {};
    } catch (error: any) {
      return { error: error.message };
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const project = Route.useLoaderData();
  if ("error" in project)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ErrorCard message={project.error} />
      </div>
    );
  return <ProjectByIdMainScreen projectId={params.projectid} />;
}
