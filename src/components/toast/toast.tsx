import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const toastVariant = cva("text-md", {
  variants: {
    type: {
      info: "text-soft-periwinkle",
      error: "text-red-600",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

type ToastProps = VariantProps<typeof toastVariant> & {
  message: string;
};

export const Toast = ({ type = "info", message }: ToastProps) => {
  return (
    <div className={cn(toastVariant({ type }))}>
      <p className="font-bold">{type?.toLocaleUpperCase()}</p>
      <p>{message}</p>
    </div>
  );
};
