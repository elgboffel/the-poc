import { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ZodType } from "zod";

export function addSchemaHelper(this: FastifyInstance, id: string, type: ZodType): { $ref: string } {
  const schema = zodToJsonSchema(type, { name: id });
  this.addSchema({ $id: id, ...schema.definitions?.[id] });
  return { $ref: `${id}#` };
}
