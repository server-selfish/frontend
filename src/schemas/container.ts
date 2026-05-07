import { z } from "zod/v3";
import { makeDataSchema } from ".";

export const ContainerStatusDefaultSchema = z
  .object({
    status: z.enum([
      "created",
      "running",
      "paused",
      "restarting",
      "removing",
      "exited",
      "dead",
    ]),
  })
  .nullable()
  .optional();

export const ContainerStatusResponseSchema = makeDataSchema(
  ContainerStatusDefaultSchema
);

export type ContainerStatusType = z.infer<typeof ContainerStatusDefaultSchema>;
