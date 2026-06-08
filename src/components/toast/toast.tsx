import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Fragment } from "react/jsx-runtime";

const toastVariant = cva("text-md", {
  variants: {
    type: {
      info: "text-soft-periwinkle",
      error: "text-red-600",
      success: "text-green-600",
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
      <p>
        {typeof message === "string"
          ? message.split("\n").map((line, idx) => (
              <Fragment key={idx}>
                {line}
                {idx < message.split("\n").length - 1 && <br />}
              </Fragment>
            ))
          : message}
      </p>
    </div>
  );
};
