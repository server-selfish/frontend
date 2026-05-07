import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Plus } from "@/assets/svg-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setSearchParams } from "@/lib/params";
import { cn } from "@/lib/utils";
import { Project } from "@/schemas/project";
import { ProjectRouteSearchSchemaType } from "@/schemas/route";
import { AddProjectCard, ProjectCard } from "./components/card/ProjectCard";
import { ProjectDetailSidebar } from "./ProjectDetailSidebar";

interface IProjectProps {
  projects: Project[] | { error: unknown } | null;
}

const ProjectDefault = ({ projects }: IProjectProps) => {
  const navigate = useNavigate({ from: "/project/" });
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState<string | null>(null);

  const searchParams = useSearch({ from: "/_protected/project/" });
  const selectedName = useMemo(() => {
    return searchParams.project;
  }, [searchParams]);

  const projectFilteredBySearch = useCallback(() => {
    if (!search) return projects;
    if (!Array.isArray(projects)) return [];
    return projects.filter((project) =>
      project?.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, projects]);

  const onProjectClicked = (name: string) => {
    if (selectedName === name) {
      setSearchParams<ProjectRouteSearchSchemaType>(
        navigate,
        {
          project: undefined,
        },
        { replace: true }
      );
      return;
    }
    setSearchParams<ProjectRouteSearchSchemaType>(
      navigate,
      {
        project: name,
      },
      { replace: true }
    );
  };
  const p = projectFilteredBySearch();
  const isProjectAnArray = Array.isArray(p);

  return (
    <div className="flex w-full h-full gap-4">
      <div
        className={cn(
          "relative flex flex-col gap-x-2 gap-y-3 text-white h-full bg-prussian-blue-light rounded-md px-6 pt-6 py-4 overflow-auto max-h-full duration-200 transition-all no-scrollbar",
          selectedName ? "w-[75%]" : "w-full"
        )}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(inputValue);
          }}
          className="w-full flex justify-center items-center gap-2 mb-2"
        >
          <Input
            className="w-xs border-soft-periwinkle focus-visible:ring-1 focus-visible:border-soft-periwinkle rounded-md placeholder:text-muted-foreground"
            placeholder="search project"
            onChange={(e) => {
              e.preventDefault();
              if (e.target.value === "") {
                setSearch("");
              }
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setSearch(inputValue);
              }
            }}
          />
          <Button
            type="submit"
            className="bg-soft-periwinkle hover:bg-soft-periwinkle-dark"
          >
            <Search size={30} className="text-prussian-blue" />
          </Button>
        </form>
        {isProjectAnArray ? (
          <div className="w-full grid grid-cols-4 gap-4 auto-rows-max items-start">
            {p.map((item) => (
              <button
                onClick={() => {
                  onProjectClicked(item?.name.toLowerCase() ?? "");
                }}
                key={item?.name}
                className="h-[10em] min-h-[10em] max-h-[10em] flex flex-col text-left cursor-pointer"
              >
                <ProjectCard project={item} />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full flex-col gap-4">
            <p className="text-lg">
              It looks like you don’t have any projects set up.
            </p>
            <div className="w-max">
              <AddProjectCard>
                <Button
                  variant={"outline"}
                  className="bg-transparent text-soft-periwinkle  border-soft-periwinkle text-xl hover:border-transparent hover:text-prussian-blue"
                >
                  start your first project
                </Button>
              </AddProjectCard>
            </div>
          </div>
        )}
        <AddProjectCard>
          <Button
            variant={"outline"}
            className="fixed right-6 bottom-4 w-16 h-16 bg-soft-periwinkle text-prussian-blue  border-black text-xl hover:bg-white hover:text-prussian-blue hover:border-prussian-blue rounded-full"
          >
            <Plus className="size-8" />
          </Button>
        </AddProjectCard>
      </div>
      <div
        className={cn(
          "bg-prussian-blue-light rounded-md px-6 pt-6 py-4 duration-200 transition-all",
          selectedName ? "w-[25%]" : "hidden"
        )}
      >
        {selectedName && <ProjectDetailSidebar />}
      </div>
    </div>
  );
};

export default ProjectDefault;
