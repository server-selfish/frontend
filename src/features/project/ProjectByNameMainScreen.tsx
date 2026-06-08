import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { githubInstallationListQueryOption } from "@/api";
import { Info } from "@/assets/svg-component";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectDetailType } from "@/schemas/project";
import {
  AddDeploymentCard,
  DeploymentCard,
} from "../deployment/card/DeploymentCard";
import { GithubAppConnect } from "../deployment/github_app/GithubAppConnect";

const ProjectByNameMainScreen = ({
  project,
}: {
  project?: ProjectDetailType | null;
}) => {
  const { data, isLoading } = useQuery(githubInstallationListQueryOption());
  return (
    <div className="w-full h-full flex flex-col px-6 py-4 bg-prussian-blue-light rounded-md overflow-auto max-h-full ">
      <ProjectBreadCrumb
        projectName={project?.project_name}
        projectDescription={project?.project_description}
      />
      {project?.deployments && project.deployments.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-4 gap-y-4 mt-4 overflow-auto no-scrollbar">
          {project.deployments.map((dep) => (
            <DeploymentCard key={dep.deployment_name} deployment={dep} />
          ))}
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner className="text-white size-10" />
            </div>
          ) : (
            <>
              {data && data?.length < 1 ? (
                <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
                  <p className="text-white text-xl">
                    Looks like your account is not connected to registered
                    Github App
                  </p>
                  <GithubAppConnect />
                </div>
              ) : (
                <div className="flex justify-center items-center w-full h-full flex-col gap-4">
                  <p className="text-lg text-white">
                    It looks like you don’t have any deployments yet in this
                    project.
                  </p>
                  <div className="w-max">
                    <AddDeploymentCard>
                      <Button
                        variant={"outline"}
                        className="bg-transparent text-soft-periwinkle  border-soft-periwinkle text-xl hover:border-transparent hover:text-prussian-blue"
                      >
                        Deploy your app now!
                      </Button>
                    </AddDeploymentCard>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

// const ProjectMenu = () => {
//   return (
//     <Tabs defaultValue="deployment">
//       <TabsList className="px-4 py-1 w-152 ">
//         <TabsTrigger
//           value="deployment"
//           className="text-lg px-4 data-[state=active]:bg-prussian-blue data-[state=active]:text-white cursor-pointer"
//         >
//           Deployment
//         </TabsTrigger>
//         <TabsTrigger
//           value="monitoring"
//           className="text-lg p-2 data-[state=active]:bg-prussian-blue data-[state=active]:text-white cursor-pointer"
//         >
//           Monitoring
//         </TabsTrigger>
//         <TabsTrigger
//           value="log"
//           className="text-lg p-2 data-[state=active]:bg-prussian-blue data-[state=active]:text-white cursor-pointer"
//         >
//           Logs
//         </TabsTrigger>
//         <TabsTrigger
//           value="settings"
//           className="text-lg p-2 data-[state=active]:bg-prussian-blue data-[state=active]:text-white cursor-pointer"
//         >
//           Settings
//         </TabsTrigger>
//       </TabsList>
//       <TabsContent value="deployment">
//         <DeploymentMain />
//       </TabsContent>
//       <TabsContent value="monitoring">
//         <MonitoringMain />
//       </TabsContent>
//       <TabsContent value="log">
//         <LogMain />
//       </TabsContent>
//       <TabsContent value="settings">
//         <SettingsMain />
//       </TabsContent>
//     </Tabs>
//   );
// };

const ProjectBreadCrumb = ({
  projectName,
  projectDescription,
}: {
  projectName?: string;
  projectDescription?: string | null;
}) => {
  return (
    <Breadcrumb className="text-white">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/project"
              className="text-xl text-white hover:text-muted-foreground"
            >
              Project
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-white text-2xl" />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex gap-2 justify-center items-center">
            <Badge
              variant="outline"
              className="border border-white bg-linear-to-r from-soft-periwinkle from-20% via-prussian-blue-dark via-80% to-prussian-blue border-none text-xl text-white px-4"
            >
              {projectName}
            </Badge>
            {projectDescription && (
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-white size-6" />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs whitespace-pre-wrap warp-break-word"
                >
                  {projectDescription}
                </TooltipContent>
              </Tooltip>
            )}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default ProjectByNameMainScreen;
