import { FastifyInstance } from "fastify";
import { getUser } from "./get-user/handler";
import { getUserReply, GetUserReply } from "./get-user/schema";
import { addSchemaHelper } from "@infrastructure/schema/add-schema-helper";

export const userRoute = async (server: FastifyInstance) => {
  server.register(
    async (server: FastifyInstance) => {
      server.get(
        "/get-user",
        {
          schema: {
            response: {
              200: server.addSchemaHelper("GetUserReply", getUserReply),
            },
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
