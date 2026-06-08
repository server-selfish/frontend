import { useCallback, useEffect, useRef } from "react";
import { Github } from "@/assets/svg-component";
import { ButtonWithIcon } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { githubInstalLinkQueryOption } from "@/api";

export const GithubAppConnect = () => {
  const { refetch: githubInstallLinkRefetch } = useQuery(
    githubInstalLinkQueryOption()
  );

  const popupRef = useRef<Window | null>(null);
  const onClickHandler = useCallback(async () => {
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

    const { data } = await githubInstallLinkRefetch();
    if (data && data.link) {
      popupRef.current = window.open(
        data.link,
        "githubAppConnect",
        `width=600,height=750,top=${top},left=${left}`
      );
    }
  }, [githubInstallLinkRefetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (popupRef.current && popupRef.current.closed) {
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <ButtonWithIcon
      icon={<Github className="size-7 text-prusian-blue" />}
      buttonSize={"lg"}
      variant={"outline"}
      onClick={onClickHandler}
      className=" py-2 text-2xl bg-white border-none"
    >
      Connect Github App
    </ButtonWithIcon>
  );
};
