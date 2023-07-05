import { RouteHandler } from "fastify";
import { prisma } from "@infrastructure/prisma/client";
import { GetUserQuery, GetUserReply } from "./schema";
import { GenericRouteHandler } from "@infrastructure/@types/route-handler";

export type GetUserHandler = GenericRouteHandler<GetUserQuery, GetUserReply>;

export const getUser: RouteHandler<GetUserHandler> = async (request, reply) => {
  const user = await prisma.user.findUnique({
    where: {
      email: "alice@prisma.io",
    },
  });

  reply.status(200).send({ name: user?.name ?? "", email: user?.email ?? "" });
};
