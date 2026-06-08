import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Close, Info, Plus } from "@/assets/svg-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CreateDeploymentSchemaInputType } from "@/schemas/deployment";
import { Dropdown, IDropdownOptionProps } from "@/components/dropdown";

const protocolOptions: IDropdownOptionProps[] = [
  {
    id: "tcp",
    label: "tcp",
  },
  {
    id: "udp",
    label: "udp",
  },
];

export const FormStepTwo = () => {
  const { register, control, watch } =
    useFormContext<CreateDeploymentSchemaInputType>();

  const techstackWatcher = watch("techstack_name");

  const {
    fields: fieldsEnv,
    append: appendEnv,
    remove: removeEnv,
  } = useFieldArray({
    control,
    name: "env",
  });

  const {
    fields: fieldsPort,
    append: appendPort,
    remove: removePort,
  } = useFieldArray({
    control,
    name: "port",
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        {techstackWatcher !== "python" && (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="build-command" className="w-max cursor-pointer">
                Build Command
              </Label>
              <Input id="build-command" {...register("build_command")} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="build-folder" className="w-max cursor-pointer">
                Build folder
              </Label>
              <Input id="build-folder" {...register("build_folder")} />
            </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          <Label htmlFor="main-file" className="w-max cursor-pointer">
            Main File Path (inside build folder)
          </Label>
          <Input id="main-file" {...register("main_file_name")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="env" className="w-max">
            ENV
          </Label>
          <div className="flex flex-col gap-3 max-h-[7.5em] overflow-auto no-scrollbar">
            {fieldsEnv.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  placeholder="KEY"
                  className="border p-2 rounded focus-visible:ring-0"
                  {...register(`env.${index}.key`)}
                />

                <Input
                  placeholder="VALUE"
                  className="border p-2 rounded focus-visible:ring-0"
                  {...register(`env.${index}.value`)}
                />

                <Button type="button" onClick={() => removeEnv(index)}>
                  <Close />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={() =>
              appendEnv({
                key: "",
                value: "",
              })
            }
          >
            <Plus />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="port" className="w-max">
            <p>PORT (0-65.535, tcp/udp)</p>
            <a
              href="https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"
              target="_blank"
            >
              <Info className="size-4 cursor-pointer" />
            </a>
          </Label>
          <div className="flex flex-col gap-3 max-h-[7.5em] overflow-auto no-scrollbar">
            {fieldsPort.map((field, index) => {
              return (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex flex-col gap-2">
                    {index === 0 && <p className="text-sm h-4">Exposed Port</p>}
                    <Input
                      placeholder="Exposed Port"
                      className="border p-2 rounded focus-visible:ring-0 min-h-max"
                      {...register(`port.${index}.external`)}
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {index === 0 && <p className="text-sm h-4">App Port</p>}
                    <Input
                      placeholder="App Port"
                      className="border p-2 rounded focus-visible:ring-0 min-h-max"
                      {...register(`port.${index}.internal`)}
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {index === 0 && <p className="text-sm h-4">Protocol</p>}
                    <Controller
                      name={`port.${index}.protocol`}
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          selectedOptionId={field.value ?? ""}
                          options={protocolOptions}
                          onChangeFn={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div
                    className={cn("flex flex-col", index === 0 ? "mt-6" : "")}
                  >
                    <Button type="button" onClick={() => removePort(index)}>
                      <Close />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <Button
            type="button"
            onClick={() =>
              appendPort({
                internal: 1,
                external: 1,
                protocol: "tcp",
              })
            }
          >
            <Plus />
          </Button>
        </div>
      </div>
    </>
  );
};
