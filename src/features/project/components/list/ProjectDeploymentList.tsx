import { useQuery } from "@tanstack/react-query";
import { containerStatusQueryOptions } from "@/api/container";
import { ProjectDeploymentSummaryType } from "@/schemas/project";
import { cn } from "@/lib/utils";

export const ProjectDeploymentList = ({
  deployment_name,
  techstack_name,
  container_name,
}: ProjectDeploymentSummaryType) => {
  const containerStatusQuery = useQuery(
    containerStatusQueryOptions(container_name)
  );
  let bg = "bg-red-700 text-white";
  switch (containerStatusQuery.data?.status) {
    case "running":
      bg = "bg-green-700";
      break;
    case "created":
    case "dead":
    case "exited":
    case "paused":
    case "removing":
      bg = "bg-red-700";
      break;
    case "restarting":
      bg = "bg-yellow-600";
      break;
  }
  return (
    <div
      className={cn(
        "h-full rounded-md flex items-center px-3 py-1 justify-between overflow-hidden font-semibold",
        bg
      )}
    >
      <p className="flex-1 min-w-0 line-clamp-1 ">{deployment_name}</p>
      <p className="whitespace-nowrap max-w-[5em] overflow-hidden text-ellipsis ml-2">
        {techstack_name}
      </p>
    </div>
  );
};
