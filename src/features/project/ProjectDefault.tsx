import { Link } from "@tanstack/react-router";
import { AddProjectCard, ProjectCard } from "./ProjectCard";

interface IProjectProps {
  projects: Project[] | { error: any };
}

const ProjectDefault = ({ projects }: IProjectProps) => {
  const isProjectAnArray = Array.isArray(projects);

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-3">
      {isProjectAnArray &&
        projects.map((item) => (
          <Link
            to="/project/$projectid"
            params={{ projectid: item.id }}
            key={item.id}
            className="min-w-2xs max-w-2xs flex flex-col min-h-[10vh] h-[10vh] max-h-[10vh]"
          >
            <ProjectCard project={item} />
          </Link>
        ))}
      <div className="min-w-32 max-w-32 flex flex-col min-h-[10vh] h-[10vh] max-h-[10vh]">
        <AddProjectCard />
      </div>
    </div>
  );
};

export default ProjectDefault;
