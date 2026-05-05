import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { useEffect } from "react";
import { Github } from "@/assets/svg-component";
import { ButtonWithIcon } from "@/components";
import { VITE_BACKEND_BASE_URL } from "@/const/env";
export const Route = createFileRoute("/")({
  component: App,
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") {
      const rt = createServerOnlyFn(() => getCookie("selfish_refresh_token"));
      const hasRefreshToken = rt();
      const params = new URLSearchParams(location.search);

      if (hasRefreshToken) {
        if (!params.has("redirect")) {
          throw redirect({
            to: "/project",
            search: { redirect: location.href },
          });
        } else {
          throw redirect({ to: "/project" });
        }
      }
    }
  },
});

function App() {
  const authURI = VITE_BACKEND_BASE_URL + "/auth/github/login";

  const onClickHandler = () => {
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
    return window.open(
      authURI,
      "githubLogin",
      `width=600,height=750,top=${top},left=${left}`
    );
  };

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "GITHUB_AUTH_SUCCESS") {
        window.location.reload();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-prussian-blue">
      <div className="flex flex-col gap-8 justify-center items-center">
        <p className="text-soft-periwinkle">
          <span className="text-lg">Welcome to </span>
          <span className="font-semibold text-prussian-blue text-2xl bg-white px-2 rounded-sm">
            selfish
          </span>
          <span className="text-lg">
            {" "}
            ! Please log in with GitHub to get started.
          </span>
        </p>
        <ButtonWithIcon
          icon={<Github className="size-7 text-prusian-blue" />}
          buttonSize={"lg"}
          variant={"outline"}
          onClick={onClickHandler}
          className=" py-2 text-2xl bg-white border-none"
        >
          Login with Github
        </ButtonWithIcon>
      </div>
    </div>
  );
}
