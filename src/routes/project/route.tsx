import Header from "@/components/appbar/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/project")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-4 py-2">
      <Header />
      <Outlet />
    </div>
  );
}
