import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectForm from "../form/ProjectForm";
import { Project } from "@/schemas/project";
import { ReactNode, useMemo, useState } from "react";
import { dateStringConverter } from "@/lib/date";
import { cn } from "@/lib/utils";
import { useSearch } from "@tanstack/react-router";
interface IProjectCardProps {
  project: Project;
  className?: string;
}
const ProjectCard = ({ project, className }: IProjectCardProps) => {
  const searchParams = useSearch({ from: "/_protected/project/" });
  const selectedName = useMemo(() => {
    return searchParams.project;
  }, [searchParams]);
  const fca = dateStringConverter(project?.created_at);
  return (
    <Card
      className={cn(
        "h-full w-full duration-150 transition-all",
        selectedName === project?.name
          ? "bg-soft-periwinkle border-soft-periwinkle"
          : "",
        className
      )}
    >
      <CardContent className="flex flex-col gap-1 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <CardTitle className="warp-break-words break-all line-clamp-2">
              {project?.name}
            </CardTitle>
            <p
              className={cn(
                "line-clamp-3 mt-1",
                selectedName === project?.name ? "" : "text-muted-foreground"
              )}
            >
              {project?.description}
            </p>
          </div>
          <p className="text-sm">Created at: {fca}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const AddProjectCard = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="h-full">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to organize and manage your deployments
            effectively
          </DialogDescription>
        </DialogHeader>
        <ProjectForm setIsOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export { ProjectCard, AddProjectCard };
