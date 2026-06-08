import randomName from "@scaleway/random-name";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectSchema,
  createProjectSchemaInfered,
} from "@/schemas/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectMutation } from "@/api/project/project.post.query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Toast } from "@/components";

const ProjectForm = ({
  setIsOpen,
}: {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const name = randomName();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProjectSchema),
  });
  const queryClient = useQueryClient();
  const m = useMutation(createProjectMutation());

  const onSubmit: SubmitHandler<createProjectSchemaInfered> = async (data) => {
    try {
      await m.mutateAsync(data);
      toast(<Toast type={"success"} message="project created" />);
      setIsOpen?.(false);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      queryClient.refetchQueries({ queryKey: ["projects"] });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
      <div className="grid flex-1 gap-2 w-full">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          defaultValue={name}
          {...register("name")}
          required={true}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="grid flex-1 gap-2 w-full">
        <Label htmlFor="description">Short Description</Label>
        <Input id="description" {...register("description")} />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className="font-semibold">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="bg-soft-periwinkle hover:bg-soft-periwinkle-dark text-prussian-blue font-semibold"
        >
          Add
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProjectForm;
