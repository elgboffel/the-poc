import { GenericRouteHandler } from "@infrastructure/types/route-handler";
import { RouteHandler } from "fastify";
import { GetUserQuery, GetUserReply } from "./schema";
export type GetUserHandler = GenericRouteHandler<GetUserQuery, GetUserReply>;
export declare const getUser: RouteHandler<GetUserHandler>;
//# sourceMappingURL=handler.d.ts.map