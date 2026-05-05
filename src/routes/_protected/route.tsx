import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") {
      const rt = createServerOnlyFn(() => getCookie("selfish_refresh_token"));
      const params = new URLSearchParams(location.search);

      if (!rt()) {
        if (params.has("redirect")) {
          throw redirect({ to: "/" });
        }
        throw redirect({
          to: "/",
          search: { redirect: location.href },
        });
      }
    }
  },
});
