import { createServerFn } from "@tanstack/react-start";
import { createApiClient, isHttpError } from "@/lib/request";
import { UserInfo, UserInfoDataResponseSchema } from "@/schemas/user";

export const fetchUserInfo = createServerFn({ method: "GET" }).handler(
  async (): Promise<UserInfo | null> => {
    try {
      const ac = createApiClient();
      const data = await ac.get<UserInfo>("/auth/me");
      return UserInfoDataResponseSchema.parse(data);
    } catch (error) {
      if (isHttpError(error) && error.status == 404) {
        return null;
      }
      throw new Error("Failed to fetch user info");
    }
  }
);
