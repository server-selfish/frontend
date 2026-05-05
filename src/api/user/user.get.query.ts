import { queryOptions } from "@tanstack/react-query";
import { fetchUserInfo } from "./user.get.api";

export const userInfoQueryOptions = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: () => fetchUserInfo(),
  });
