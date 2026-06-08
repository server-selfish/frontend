import { z } from "zod/v4";
import { makeDataSchema } from ".";

const UserInfoSchema = z.object({
  id: z.string(),
  provider: z.string(),
  provider_user_id: z.number(),
  username: z.string(),
  email: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
});

export const UserInfoDataResponseSchema = makeDataSchema(UserInfoSchema);
export type UserInfo = z.infer<typeof UserInfoSchema>;
