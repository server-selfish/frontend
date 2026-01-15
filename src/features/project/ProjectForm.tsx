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
const ProjectForm = () => {
  const name = randomName();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit: SubmitHandler<createProjectSchemaInfered> = (data) => {
    console.log("Form Submitted:", data);
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
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" className="bg-green-phthalo">
          Add
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProjectForm;
