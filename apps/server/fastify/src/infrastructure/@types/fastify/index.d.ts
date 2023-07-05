import "fastify";
import { ZodType } from "zod";

declare module "fastify" {
  interface FastifyInstance {
    addSchemaHelper(this: FastifyInstance, id: string, type: ZodType): { $ref: string };
  }
}
