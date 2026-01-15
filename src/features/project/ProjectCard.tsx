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
import { Plus } from "lucide-react";

interface IProjectCardProps {
  project: Project;
}
const ProjectCard = ({ project }: IProjectCardProps) => {
  return (
    <Card className="h-full">
      <CardContent>
        <CardTitle className="warp-break-words break-all line-clamp-2">
          {project.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-1">
          {project.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const AddProjectCard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="h-full">
        <Card className="cursor-pointer flex justify-center items-center border-dashed border-2 border-gray-400 bg-gray-300">
          <Plus size={45} className="text-gray-500"/>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to organize and manage your deployments
            effectively
          </DialogDescription>
        </DialogHeader>
        <ProjectForm />
      </DialogContent>
    </Dialog>
  );
};

export { ProjectCard, AddProjectCard };
