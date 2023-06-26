import {FastifyInstance} from "fastify";
import {zodToJsonSchema} from "zod-to-json-schema";
import {ZodType} from "zod";

export function addSchemaHelper(id:string, type: ZodType, server: FastifyInstance): { $ref: string } {

  const schema = zodToJsonSchema(type, { name: id });
  server.addSchema({ $id: id, ...schema.definitions?.[id] });
  return { $ref: `${id}#`};
}
