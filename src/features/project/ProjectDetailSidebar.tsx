import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";
import { toast } from "sonner";
import { projectByNameQueryOptions } from "@/api";
import { Close, Hyperlink } from "@/assets/svg-component";
import { Toast } from "@/components";
import { dateStringConverter } from "@/lib/date";
import { setSearchParams } from "@/lib/params";
import { ProjectRouteSearchSchemaType } from "@/schemas/route";
import { ProjectDeploymentList } from "./components/list/ProjectDeploymentList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProjectDetailSidebar = () => {
  const searchParams = useSearch({ from: "/_protected/project/" });
  const navigate = useNavigate({ from: "/project/" });

  const selectedName = useMemo(() => {
    return searchParams.project;
  }, [searchParams]);
  const projectDetailQuery = useQuery(
    projectByNameQueryOptions(selectedName ?? "")
  );
  if (projectDetailQuery.error) {
    toast(<Toast type="error" message={projectDetailQuery.error.message} />);
  }
  const project = projectDetailQuery.data;
  const fca = dateStringConverter(project?.project_created_at);

  const onCloseClicked = () => {
    setSearchParams<ProjectRouteSearchSchemaType>(
      navigate,
      {
        project: undefined,
      },
      { replace: true }
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col mb-2">
        <Close
          className="size-8 text-white self-end cursor-pointer hover:text-soft-periwinkle"
          onClick={() => onCloseClicked()}
        />
        <div className="flex items-center">
          <Link
            to="/project/$projectname"
            params={{ projectname: project?.project_name ?? "" }}
          >
            <p className="text-white text-xl font-semibold line-clamp-2 hover:text-soft-periwinkle cursor-pointer transition-all duration-100">
              {project?.project_name}
            </p>
          </Link>
          <Link
            to="/project/$projectname"
            params={{ projectname: project?.project_name ?? "" }}
            target="_blank"
          >
            <Hyperlink className="size-5 text-white ml-2 shrink-0 hover:text-soft-periwinkle cursor-pointer transition-all duration-100" />
          </Link>
        </div>
        <div className="h-0.5 w-full bg-soft-periwinkle mt-2" />
      </div>
      {project?.project_description && (
        <div className="flex flex-col bg-soft-periwinkle min-h-[6em] rounded-md text-black px-2 py-1 justify-center items-center">
          <p className="text-md text-center text-prussian-blue">
            {project?.project_description}
          </p>
        </div>
      )}
      <p className="text-muted">Created at: {fca}</p>
      <div className="flex flex-col">
        <p className="text-white text-xl font-semibold">Deployment</p>
        <div className="h-0.5 w-full bg-soft-periwinkle my-2" />

        {project?.deployments && project?.deployments?.length > 0 ? (
          <>
            <div className="flex h-6 my-2 mb-4 text-white justify-between">
              <div className="flex h-full gap-2">
                <div className="h-full w-1 bg-green-700 rounded" />
                <span>Running</span>
              </div>
              <div className="flex h-full gap-2">
                <div className="h-full w-1 bg-yellow-600 rounded" />
                <span>Restarting</span>
              </div>
              <div className="flex h-full gap-2">
                <div className="h-full w-1 bg-red-700 rounded" />
                <span>Stopped</span>
              </div>
            </div>
            {project?.deployments?.map((item) => (
              <div className="h-10" key={item.deployment_name}>
                <ProjectDeploymentList {...item} />
              </div>
            ))}
          </>
        ) : (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle className="font-semibold">
              You don't have deployment yet here :(
            </AlertTitle>
            <AlertDescription>
              <p>
                Deploy your first ever deployment in{" "}
                <span className="font-semibold">{project?.project_name}</span>{" "}
                project now !
              </p>
              <div className="w-full flex justify-center items-center">
                <Button className="w-full bg-prussian-blue text-soft-periwinkle hover:bg-prussian-blue-light">
                  Lets Get Started !
                </Button>
              </div>
            </AlertDescription>
          </Alert>
          // <p className="text-white text-center">No Deployments yet :(</p>
        )}
      </div>
    </div>
  );
};
