import { z } from "zod";

export const getUserQuery = z.object({});

export const getUserReply = z.object({
  name: z.string(),
  email: z.string(),
});

export type GetUserQuery = z.infer<typeof getUserQuery>;
export type GetUserReply = z.infer<typeof getUserReply>;
