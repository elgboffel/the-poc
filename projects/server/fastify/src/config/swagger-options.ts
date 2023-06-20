import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { withRefResolver } from "fastify-zod";

export const swaggerOptions = withRefResolver({
	openapi: {
		info: {
			title: "Sample API using Fastify and Zod.",
			version: "1.0.0",
		},
	},
});

export const swaggerOptionsUI: FastifySwaggerUiOptions = {
	routePrefix: "/docs",
	staticCSP: true,
};
