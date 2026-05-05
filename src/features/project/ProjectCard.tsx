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
import ProjectForm from "./ProjectForm";
import { Project } from "@/schemas/project";
import { ReactNode, useState } from "react";
import { format, parse } from "date-fns";
interface IProjectCardProps {
  project: Project;
}
const ProjectCard = ({ project }: IProjectCardProps) => {
  const cleaned = project.created_at
    .replace(/([+-]\d{4})\s+\w+$/, "$1")
    .replace(/\.(\d{3})\d+/, ".$1");
  const parsed = parse(cleaned, "yyyy-MM-dd HH:mm:ss.SSS xx", new Date());
  const fca = format(parsed, "yyyy/MM/dd HH:mm:ss");
  return (
    <Card className="h-full w-full">
      <CardContent className="flex flex-col gap-1 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <CardTitle className="warp-break-words break-all line-clamp-2">
              {project.name}
            </CardTitle>
            <CardDescription className="line-clamp-3 mt-1">
              <p>{project.description}</p>
            </CardDescription>
          </div>
          <p className="text-sm text-black">Created at: {fca}</p>
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
