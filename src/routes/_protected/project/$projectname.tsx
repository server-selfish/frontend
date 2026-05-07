import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/project/$projectname")({
  // loader: async ({ context, params: { projectid } }) => {
  //   try {
  //     const data = await context.queryClient.ensureQueryData(projectQueryOptions(projectid));
  //     return data;
  //     // return { id: "1", name: "hendyck", description: "asd" } as Project;
  //   } catch (error: any) {
  //     return { error: error.message };
  //   }
  // },
  component: RouteComponent,
});

function RouteComponent() {
  // const project = Route.useLoaderData();
  // if ('error' in project)
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <ErrorCard message={project.error} />
  //     </div>
  //   );
  // return <ProjectByIdMainScreen project={project} />;
}
