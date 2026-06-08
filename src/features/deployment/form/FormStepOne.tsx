import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { githubInstalLinkQueryOption } from "@/api";
import { Configure, Github, Plus } from "@/assets/svg-component";
import { Dropdown, IDropdownOptionProps } from "@/components/dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  CreateDeploymentSchemaInputType,
  TechstackType,
  TechstackVersionType,
} from "@/schemas/deployment";

interface IFormStepOneProps {
  defaultName: string;
  installationDropdownOptions: IDropdownOptionProps[];
  installationListLoading: boolean;
  repositoryDropdownOption: IDropdownOptionProps[];
  repositoryLoading: boolean;
  techstackData?: TechstackType | null;
  techstackLoading: boolean;
  techstackVersionData?: TechstackVersionType[] | null;
  techstackVersionLoading: boolean;
}

export const FormStepOne = ({
  defaultName,
  installationDropdownOptions,
  repositoryDropdownOption,
  installationListLoading,
  repositoryLoading,
  techstackData,
  techstackVersionData,
  techstackLoading,
  techstackVersionLoading,
}: IFormStepOneProps) => {
  const queryClient = useQueryClient();
  const { register, watch, control } =
    useFormContext<CreateDeploymentSchemaInputType>();

  const installationIdWatcher = watch("installation_id");

  const popupRef = useRef<Window | null>(null);

  const { refetch: githubInstallLinkRefetch } = useQuery(
    githubInstalLinkQueryOption()
  );

  const techstackDropdownOption = useMemo(
    () => createDropdownOptionsFromTechstack(techstackData),
    [techstackData]
  );

  const techstackVersionDropdownOption = useMemo(
    () => createDropdownOptionsFromTechstackVersion(techstackVersionData),
    [techstackVersionData]
  );

  const onClickHandler = useCallback(async () => {
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;

    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const left = width / 2 - 600 / 2 + dualScreenLeft;
    const top = height / 2 - 750 / 2 + dualScreenTop;

    const { data } = await githubInstallLinkRefetch();
    if (data && data.link) {
      popupRef.current = window.open(
        data.link,
        "githubAppConnect",
        `width=600,height=750,top=${top},left=${left}`
      );
    }
  }, [githubInstallLinkRefetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        popupRef.current &&
        popupRef.current.closed &&
        installationIdWatcher
      ) {
        queryClient.refetchQueries({
          queryKey: [
            "github-app-installation-repositories",
            installationIdWatcher,
          ],
        });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [queryClient, installationIdWatcher]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="deployment_name" className="w-max cursor-pointer">
          Deployment Name
        </Label>
        <Input
          id="deployment_name"
          defaultValue={defaultName}
          {...register("deployment_name")}
          required={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="w-max cursor-pointer">
          Description
        </Label>
        <Input id="description" {...register("deployment_description")} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="installation" className="w-max cursor-pointer">
          Account
        </Label>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Controller
              name="installation_id"
              control={control}
              render={({ field }) => (
                <>
                  {installationListLoading ? (
                    <Spinner />
                  ) : (
                    <Dropdown
                      Icon={<Github className="gap-2 size-5" />}
                      triggerLabel="installation"
                      selectedOptionId={field.value ?? ""}
                      options={installationDropdownOptions}
                      onChangeFn={field.onChange}
                    />
                  )}
                </>
              )}
            />
          </div>
        </div>
        <Button
          className="bg-prussian-blue w-full"
          type="button"
          onClick={onClickHandler}
        >
          <Plus />
          /
          <Configure />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="repository" className="w-max cursor-pointer">
          Repositories
        </Label>
        <Controller
          name="repository_id"
          control={control}
          render={({ field }) => (
            <>
              {repositoryLoading ? (
                <div className="flex justify-center items-center">
                  <Spinner className="size-7" />
                </div>
              ) : (
                <Dropdown
                  triggerLabel="repository"
                  selectedOptionId={field.value ?? ""}
                  options={repositoryDropdownOption}
                  onChangeFn={field.onChange}
                />
              )}
            </>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="branch_name" className="w-max cursor-pointer">
          Branch Name
        </Label>
        <Input
          id="branch_name"
          defaultValue={"main"}
          {...register("branch_name")}
          required={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="techstack" className="cursor-pointer">
          Techstack
        </Label>
        <div className="flex gap-2">
          <Controller
            name="techstack_name"
            control={control}
            render={({ field }) => (
              <>
                {techstackLoading ? (
                  <div className="flex justify-center items-center">
                    <Spinner className="size-7" />
                  </div>
                ) : (
                  <div className="w-3/4">
                    <Dropdown
                      triggerLabel="techstack"
                      selectedOptionId={field.value ?? ""}
                      options={techstackDropdownOption}
                      onChangeFn={field.onChange}
                    />
                  </div>
                )}
              </>
            )}
          />
          <Controller
            name="techstack_version"
            control={control}
            render={({ field }) => (
              <>
                {techstackVersionLoading ? (
                  <div className="flex justify-center items-center">
                    <Spinner className="size-7" />
                  </div>
                ) : (
                  <div className="w-full">
                    <Dropdown
                      selectedOptionId={field.value ?? ""}
                      options={techstackVersionDropdownOption}
                      onChangeFn={field.onChange}
                    />
                  </div>
                )}
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

const createDropdownOptionsFromTechstack = (
  data?: TechstackType | null
): IDropdownOptionProps[] => {
  const o = data?.name?.map((d) => {
    return {
      id: d?.toLowerCase(),
      label: d,
    };
  });
  return o ?? [];
};

const createDropdownOptionsFromTechstackVersion = (
  data?: TechstackVersionType[] | null
): IDropdownOptionProps[] => {
  const o = data?.map((d) => {
    return {
      id: d.id.toString(),
      label: d.version,
    };
  });
  return o ?? [];
};
