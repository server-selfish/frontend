import { toast } from "sonner";
import { ZodIssue } from "zod/v3";
import { Toast } from "@/components";

type ZodErrorLike = {
  issues: ZodIssue[];
};

const isZodError = (error: unknown): error is ZodErrorLike => {
  return (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray(error.issues)
  );
};

type AxiosErrorLike = {
  data?: unknown;
  response?: {
    data?: unknown;
  };
};

const isAxiosErrorLike = (error: unknown): error is AxiosErrorLike => {
  return (
    typeof error === "object" &&
    error !== null &&
    ("response" in error || "data" in error)
  );
};

export const handleGlobalError = (error: unknown) => {
  if (isZodError(error)) {
    const message = error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    toast(<Toast type="error" message={message} />);
    return;
  }

  if (error instanceof Error) {
    toast.error(<Toast type="error" message={error.message} />);
    return;
  }

  if (isAxiosErrorLike(error)) {
    const errorData = error.data || error.response?.data;
    if (errorData && typeof errorData === "object" && "message" in errorData) {
      toast.error(
        <Toast
          type="error"
          message={String((errorData as { message: unknown }).message)}
        />
      );
      return;
    }
    if (errorData) {
      toast.error(<Toast type="error" message={String(errorData)} />);
      return;
    }
  }

  toast.error(<Toast type="error" message={String(error)} />);
};
