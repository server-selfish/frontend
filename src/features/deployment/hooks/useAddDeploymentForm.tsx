import { zodResolver } from "@hookform/resolvers/zod";
import randomName from "@scaleway/random-name";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  githubInstallationListQueryOption,
  githubInstallationRepositoriesQueryOption,
  techstackQueryOption,
  techstackVersionQueryOption,
} from "@/api";
import { createDeploymentMutation } from "@/api/deployment/deployment.post.query";
import { Toast } from "@/components";
import { IDropdownOptionProps } from "@/components/dropdown";
import { setSearchParams } from "@/lib/params";
import {
  CreateDeploymentSchema,
  CreateDeploymentSchemaInputType,
  CreateDeploymentSchemaOutputType,
  CreateDeploymentSubmitSchemaType,
  GithubInstallationListType,
  GithubInstallationRepositoryType,
} from "@/schemas/deployment";
import { ProjectByNameRouteSearchSchemaType } from "@/schemas/route";

export const useAddDeploymentForm = ({
  setIsOpen,
}: {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const name = randomName();
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/project/$projectname" });
  const searchParams = useSearch({ from: "/_protected/project/$projectname" });
  const { projectname } = useParams({
    from: "/_protected/project/$projectname",
  });
  const form = useForm<
    CreateDeploymentSchemaInputType,
    undefined,
    CreateDeploymentSchemaOutputType
  >({
    resolver: zodResolver(CreateDeploymentSchema),
    defaultValues: {
      branch_name: "main",
      deployment_name: name,
      build_command: "npm run build",
      build_folder: "dist",
    },
  });

  const installationIdWatcher = form.watch("installation_id");
  const repositoryWatcher = form.watch("repository_id");
  const branchWatcher = form.watch("branch_name");
  const techstackWatcher = form.watch("techstack_name");
  const techstackVersionWatcher = form.watch("techstack_version");

  const selectedStep = useMemo(() => {
    if (!repositoryWatcher || !techstackWatcher || !techstackVersionWatcher)
      return 1;
    if (searchParams.step) return searchParams.step;
    return 1;
  }, [
    searchParams,
    repositoryWatcher,
    techstackWatcher,
    techstackVersionWatcher,
  ]);

  const { data: installationListData, isLoading: installationListLoading } =
    useQuery(githubInstallationListQueryOption());
  const { data: repositoryListData, isLoading: repositoryLoading } = useQuery(
    githubInstallationRepositoriesQueryOption(installationIdWatcher)
  );

  const { data: techstackData, isLoading: techstackLoading } = useQuery(
    techstackQueryOption()
  );

  const { data: techstackVersionData, isLoading: techstackVersionLoading } =
    useQuery(techstackVersionQueryOption(techstackWatcher?.toLowerCase()));

  const onStepClicked = (arg: "prev" | "next") => {
    if (arg === "prev" && selectedStep === 1) return;
    if (arg === "next" && selectedStep === 2) return;
    const stepNumber = arg === "prev" ? 1 : 2;
    setSearchParams<ProjectByNameRouteSearchSchemaType>(
      navigate,
      {
        step: stepNumber,
      },
      { replace: true }
    );
  };

  const installationDropdownOptions = useMemo(() => {
    return createDropdownOptionsFromInstallationList(installationListData);
  }, [installationListData]);

  useEffect(() => {
    if (installationListData?.[0]?.installation_id) {
      form.setValue(
        "installation_id",
        installationListData[0].installation_id.toString()
      );
    }
  }, [form, installationListData]);

  const repositoryDropdownOption = useMemo(() => {
    return createDropdownOptionsFromRepositoryList(repositoryListData);
  }, [repositoryListData]);

  useEffect(() => {
    if (repositoryListData?.[0]?.id) {
      form.setValue("repository_id", repositoryListData[0].id.toString());
    }
  }, [form, repositoryListData]);

  const selectedInstallation = useMemo(() => {
    return installationDropdownOptions.find(
      (r) => r?.id == installationIdWatcher
    )?.label;
  }, [installationDropdownOptions, installationIdWatcher]);

  const selectedRepository = useMemo(() => {
    return repositoryDropdownOption.find((r) => r?.id === repositoryWatcher)
      ?.label;
  }, [repositoryDropdownOption, repositoryWatcher]);

  // build & file name autofill
  useEffect(() => {
    switch (techstackWatcher?.toLowerCase()) {
      case "node.js": {
        form.setValue("build_command", "npm run build");
        form.setValue("build_folder", "dist");
        form.setValue("main_file_name", "index.js");
        break;
      }
      case "python": {
        form.setValue("main_file_name", "main.py");
        break;
      }
      case "go": {
        form.setValue("build_command", "go build");
        form.setValue("build_folder", "build");
        form.setValue("main_file_name", "main");
        break;
      }
    }
  }, [techstackWatcher, form]);

  useEffect(() => {
    if (techstackVersionData?.[0]) {
      form.setValue("techstack_version", techstackVersionData[0].id.toString());
    }
  }, [form, techstackVersionData]);

  useEffect(() => {
    if (!techstackWatcher && techstackData?.name[0]) {
      form.setValue("techstack_name", techstackData.name[0].toLowerCase());
    }
  }, [form, techstackData, techstackWatcher]);

  const m = useMutation(createDeploymentMutation());
  const onSubmit: SubmitHandler<CreateDeploymentSchemaOutputType> = async (
    data
  ) => {
    try {
      const d: CreateDeploymentSubmitSchemaType = {
        project_name: projectname,
        deployment_name: data.deployment_name,
        deployment_description: data.deployment_description,
        installation_id: data.installation_id,
        repository_id: data.repository_id,
        branch_name: data.branch_name,
        main_file_name: data.main_file_name,
        env: data.env,
        port: data.port,
        techstack_id: parseInt(data.techstack_version),
        build_command: data.build_command,
        build_folder: data.build_folder,
      };
      await m.mutateAsync(d);
      setIsOpen?.(false);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      queryClient.invalidateQueries({
        queryKey: ["project-by-name-detail", projectname],
      });
    }
  };
  const onSubmitError: SubmitErrorHandler<CreateDeploymentSchemaOutputType> = (
    errors
  ) => {
    const errorMap = new Map<string, string>();

    Object.entries(errors).forEach(([field, errorValue]) => {
      if (Array.isArray(errorValue)) {
        const messages: string[] = [];
        errorValue.forEach((item) => {
          if (item && typeof item === "object") {
            Object.values(item).forEach((subError) => {
              if (
                subError &&
                typeof subError === "object" &&
                "message" in subError &&
                typeof (subError as { message?: unknown }).message === "string"
              ) {
                messages.push((subError as { message: string }).message);
              }
            });
          }
        });
        if (messages.length > 0) {
          errorMap.set(field, messages.join("\n"));
        }
      } else if (
        errorValue &&
        typeof errorValue === "object" &&
        "message" in errorValue &&
        typeof (errorValue as { message?: unknown }).message === "string"
      ) {
        errorMap.set(field, (errorValue as { message: string }).message);
      }
    });
    toast.error(
      <Toast
        type={"error"}
        message={Array.from(errorMap.values()).join("\n")}
      />
    );
  };
  return {
    form,
    selectedStep,
    selectedInstallation,
    selectedRepository,
    branchWatcher,
    onSubmit,
    onSubmitError,
    name,
    installationDropdownOptions,
    installationListLoading,
    repositoryDropdownOption,
    repositoryLoading,
    techstackData,
    techstackLoading,
    techstackVersionData,
    techstackVersionLoading,
    onStepClicked,
  };
};

const createDropdownOptionsFromInstallationList = (
  data?: GithubInstallationListType[] | null
): IDropdownOptionProps[] => {
  const o = data?.map((d) => {
    return {
      id: d.installation_id.toString(),
      label: d.account_login ?? "",
    };
  });
  return o ?? [];
};

const createDropdownOptionsFromRepositoryList = (
  data?: GithubInstallationRepositoryType[] | null
): IDropdownOptionProps[] => {
  const o = data?.map((d) => {
    return {
      id: d.id.toString(),
      label: d.name ?? "",
    };
  });
  return o ?? [];
};
