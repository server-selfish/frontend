import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProjectForm from "./components/form/ProjectForm";

const ProjectEmpty = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Card className="w-full max-w-sm cursor-pointer text-center shadow-green-phthalo">
        <CardContent>
          <p className="text-lg">
            You don't have any projects yet. Create one now to get started!
          </p>
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-soft-periwinkle text-white">
            Get Started
          </Button>
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
    </div>
  );
};

export { ProjectEmpty };
