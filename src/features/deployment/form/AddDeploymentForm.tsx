import { Dispatch, SetStateAction } from "react";
import { FormProvider } from "react-hook-form";
import { ChevronLeft, ChevronRight, Git, Github } from "@/assets/svg-component";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FormStepOne } from "./FormStepOne";
import { FormStepTwo } from "./FormStepTwo";
import { useAddDeploymentForm } from "../hooks/useAddDeploymentForm";

export const AddDeploymentForm = ({
  setIsOpen,
}: {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
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
  } = useAddDeploymentForm({ setIsOpen });

  return (
    <FormProvider {...form}>
      {selectedStep === 2 && (
        <div className="flex items-center gap-3 text-sm self-start">
          <div className="flex items-center gap-1">
            <Github className="size-4" />
            <p className="text-muted-foreground">
              {selectedInstallation}/{selectedRepository}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Git className="size-4" />
            <p className="text-muted-foreground">{branchWatcher}</p>
          </div>
        </div>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
        className="flex flex-col items-center gap-4 w-full"
      >
        <div className="grid flex-1 gap-4 w-full">
          {selectedStep === 1 ? (
            <FormStepOne
              defaultName={name}
              installationDropdownOptions={installationDropdownOptions}
              installationListLoading={installationListLoading}
              repositoryDropdownOption={repositoryDropdownOption}
              repositoryLoading={repositoryLoading}
              techstackData={techstackData}
              techstackLoading={techstackLoading}
              techstackVersionData={techstackVersionData}
              techstackVersionLoading={techstackVersionLoading}
            />
          ) : (
            <FormStepTwo />
          )}
        </div>
        <DialogFooter className="w-full flex flex-row items-center sm:justify-between">
          <ChevronLeft
            className={cn(
              "size-5 cursor-pointer",
              selectedStep === 1 ? "text-muted-foreground cursor-default" : ""
            )}
            onClick={() => {
              onStepClicked("prev");
            }}
          />
          <div className="flex gap-2">
            <DialogClose asChild className="w-full">
              <Button variant="outline" className="font-semibold w-max">
                Cancel
              </Button>
            </DialogClose>
            {selectedStep === 2 && (
              <Button
                type="submit"
                className="bg-soft-periwinkle hover:bg-soft-periwinkle-dark text-white font-semibold"
              >
                Add
              </Button>
            )}
          </div>
          <ChevronRight
            className={cn(
              "size-5 cursor-pointer",
              selectedStep === 2 ? "text-muted-foreground cursor-default" : ""
            )}
            onClick={() => {
              onStepClicked("next");
            }}
          />
        </DialogFooter>
      </form>
    </FormProvider>
  );
};
