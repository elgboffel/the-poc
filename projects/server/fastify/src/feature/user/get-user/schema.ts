import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const getUserQuery = z.object({});

export const getUserReply = z
	.object({
		name: z.string(),
		email: z.string(),
	})
	.optional();

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
	{
		getUserReply,
	},
	{
		$id: "userSchemas",
	}
);

export type GetUserQuery = z.infer<typeof getUserQuery>;
export type GetUserReply = z.infer<typeof getUserReply>;

//export type GetUserQueryType = Static<typeof GetUserQuery>;
//export type GetUserReplyType = Static<typeof GetUserReply>;
