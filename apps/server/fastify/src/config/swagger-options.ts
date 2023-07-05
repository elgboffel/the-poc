import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { JSONObject, SwaggerOptions } from "@fastify/swagger";

export const swaggerOptions: SwaggerOptions = {
  openapi: {
    info: {
      title: "Sample API using Fastify and Zod.",
      version: "1.0.0",
    },
  },
  transform: (schema) => {
    console.log("schema", schema.schema);
    return schema as any;
  },
  refResolver: {
    buildLocalReference: (json, baseUri, fragment, i) => {
      console.log("json", json);
      console.log("baseUri", baseUri);
      console.log("fragment", fragment);

      return json.$id?.toString() || `def-${i}`;
    },
  },
};

export const swaggerOptionsUI: FastifySwaggerUiOptions = {
  routePrefix: "/docs",
  staticCSP: true,
};
