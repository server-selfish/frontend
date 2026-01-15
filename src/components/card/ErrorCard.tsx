import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleX } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "@tanstack/react-router";

const ErrorCard = ({ message }: { message: string }) => {
  const router = useRouter();

  return (
    <Card className="w-full max-w-sm border-red-600">
      <CardHeader>
        <CardTitle className="text-xl flex justify-center items-center text-red-600">
          <CircleX size={40} />
        </CardTitle>
        <CardDescription className="text-black text-md">
          <p className="font-semibold">Error Message:</p>
          <p className="text-red-600">{message}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full flex justify-center">
        <Button
          className="w-full"
          variant={"destructive"}
          onClick={() => {
            router.invalidate();
          }}
        >
          Reload
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
