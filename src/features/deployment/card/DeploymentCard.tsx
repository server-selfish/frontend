import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { containerStatusQueryOptions } from "@/api/container";
import {
  Git,
  Github,
  Go,
  History,
  Mail,
  Nodejs,
  Python,
} from "@/assets/svg-component";
import * as card from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setSearchParams } from "@/lib/params";
import { cn } from "@/lib/utils";
import { ContainerStatusType } from "@/schemas/container";
import { ProjectDeploymentDetailType } from "@/schemas/project";
import { ProjectByNameRouteSearchSchemaType } from "@/schemas/route";
import { AddDeploymentForm } from "../form/AddDeploymentForm";
import { dateStringConverter } from "@/lib/date";

export const DeploymentCard = ({
  deployment,
}: {
  deployment: ProjectDeploymentDetailType;
}) => {
  const containerStatusQuery = useQuery(
    containerStatusQueryOptions(deployment.container_name)
  );
  return (
    <card.Card
      className={cn(
        "py-4 w-full bg-card-gradient border-[0.5px] border-soft-periwinkle duration-150 transition-all text-white min-h-max h-[18em] max-h-[20em]"
      )}
    >
      <card.CardContent className="flex flex-col gap-1 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <card.CardTitle className="leading-5 flex items-center space-x-2 w-full justify-between">
                <p className="w-full line-clamp-2 break-all font-bold text-xl text-center">
                  {deployment.deployment_name}
                </p>
                <div className="w-[30%] flex flex-col justify-center items-center gap-2 bg-prussian-blue py-1.5 rounded-md">
                  <TechstackIcon
                    name={deployment.techstack_name?.toLowerCase() ?? ""}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <span className="break-all">
                      {deployment.techstack_name}
                    </span>
                    <span className="break-all line-clamp-1">
                      {deployment.techstack_version}
                    </span>
                  </div>
                </div>
              </card.CardTitle>
              <div className="mt-3 flex flex-col space-y-1 ">
                <div className="flex gap-2 items-center ">
                  <Github className="size-5 shrink-0" />
                  <a href="https://github.com/daffadon/fndn" target="_blank">
                    <p className="line-clamp-1 hover:text-soft-periwinkle duration-200">
                      {deployment.deployment_url}
                    </p>
                  </a>
                </div>
                <div className="flex gap-2 items-center">
                  <Git className="size-5 shrink-0" />
                  <p>{deployment.deployment_branch}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <History className="size-5 shrink-0" />
                  <p>{deployment.deployment_version}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Mail className="size-5 shrink-0" />
                  <p className="line-clamp-1">
                    {deployment.deployment_commit_msg}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4 items-center">
              <p className="">
                {dateStringConverter(deployment?.deployment_history_created_at)}
              </p>
              <div className="bg-prussian-blue-tsp-40 py-1 px-4 rounded-full flex gap-2 items-center justify-center">
                <DeploymentStatus s={containerStatusQuery.data} />
              </div>
            </div>
          </div>
        </div>
      </card.CardContent>
    </card.Card>
  );
};

export const TechstackIcon = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case "node.js":
      return <Nodejs className="size-7" color="#5FA04E" />;
    case "go":
      return <Go className="size-8" color="#00ADD8" />;
    case "python":
      return <Python className="size-7" color="#FFFF00" />;
  }
};

export const DeploymentStatus = ({ s }: { s: ContainerStatusType }) => {
  switch (s?.container_status) {
    case "running":
      return (
        <>
          <div className="bg-green-700 w-2 h-2 rounded-full" />
          <p className="">Running</p>
        </>
      );
    case "created":
    case "dead":
    case "exited":
    case "paused":
    case "removing":
      return (
        <>
          <div className="bg-red-700 w-2 h-2 rounded-full" />
          <p className="">Stopped</p>
        </>
      );
    case "restarting":
      return (
        <>
          <div className="bg-yellow-600 w-2 h-2 rounded-full" />
          <p className="">Restarting</p>
        </>
      );
  }
};

export const AddDeploymentCard = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearch({ from: "/_protected/project/$projectname" });
  const [isDialogOpen, setIsDialogOpen] = useState(
    searchParams.step ? true : false
  );
  const navigate = useNavigate({ from: "/project/$projectname" });
  const handleOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);

    if (!isOpen) {
      setTimeout(() => {
        setSearchParams<ProjectByNameRouteSearchSchemaType>(
          navigate,
          {
            step: undefined,
          },
          { replace: true }
        );
      }, 200);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="h-full">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 flex flex-col justify-between items-center">
        <DialogHeader className="">
          <DialogTitle>Add New Deployment</DialogTitle>
          <DialogDescription>
            Create a new deployment in this project to start your wonderfull
            app!
          </DialogDescription>
        </DialogHeader>
        <AddDeploymentForm setIsOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};
