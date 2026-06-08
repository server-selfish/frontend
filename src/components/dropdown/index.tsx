import { ReactNode, useCallback, useMemo, useState } from "react";
import { ChevronDown } from "@/assets/svg-component";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export type IDropdownOptionProps = {
  id: string;
  label: string;
  suffix?: ReactNode;
  prefix?: ReactNode;
};
interface IDropdownProps {
  options: IDropdownOptionProps[];
  selectedOptionIcons?: ReactNode;
  selectedOptionId: string;
  onChangeFn: (arg: string) => void;
  triggerLabel?: string;
  Icon?: ReactNode;
}

export const Dropdown = ({
  options,
  selectedOptionId,
  onChangeFn,
  triggerLabel,
  Icon,
}: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedOption = useMemo(() => {
    return options.find((o) => o?.id === selectedOptionId);
  }, [selectedOptionId, options]);

  const selectOptionHandler = useCallback(
    (optionId: string) => {
      if (optionId === selectedOptionId) return;
      onChangeFn(optionId.toString());
      setIsOpen(false);
    },
    [onChangeFn, selectedOptionId]
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          className="w-full flex justify-between"
          id={triggerLabel}
        >
          <div className="flex gap-2 items-center">
            {Icon}
            <p className="line-clamp-1">{selectedOption?.label}</p>
          </div>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) px-0 py-1">
        <ul>
          {options.map((o) => {
            return (
              <li
                key={o.id}
                onClick={() => {
                  selectOptionHandler(o.id);
                }}
                className={cn(
                  "line-clamp-1 px-2 py-1 hover:bg-soft-periwinkle",
                  o.id != selectedOption?.id ? "cursor-pointer" : "",
                  o.id == selectedOption?.id
                    ? "bg-soft-periwinkle text-white"
                    : ""
                )}
              >
                {o.label}
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
