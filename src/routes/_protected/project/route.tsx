import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/project")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-4 py-2 bg-prussian-blue min-h-screen h-screen flex flex-col">
      {/*<Header />*/}
      <Outlet />
    </div>
  );
}
