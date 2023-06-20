import { FastifyInstance } from "fastify";
import { getUser } from "./get-user/handler";
import { $ref, getUserQuery, getUserReply, userSchemas } from "./get-user/schema";
import { zodToJsonSchema } from "zod-to-json-schema";
import { buildJsonSchemas } from "fastify-zod";

export const userRoute = async (server: FastifyInstance) => {
	for (const schema of userSchemas) {
		console.log(schema);
		server.addSchema(schema);
	}

	server.register(
		async (server: FastifyInstance) => {
			server.get(
				"/get-user",
				{
					schema: {
						response: { 200: $ref("getUserReply") },
					},
				},
				getUser
			);
		},
		{
			prefix: "/user",
		}
	);
};
