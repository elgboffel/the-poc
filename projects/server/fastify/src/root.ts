import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { swaggerOptions, swaggerOptionsUI } from "@config/swagger-options";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import bearerAuthPlugin from "@fastify/bearer-auth";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import caching from "@fastify/caching";
import { userRoute } from "@feature/user/route";

const BEARER_AUTH_READ_ONLY_KEYS = new Set(["public", "private"]);
const BEARER_AUTH_WRITE_KEYS = new Set(["private"]);

const ALLOW_ORIGINS = "//localhost:3000, //localhost:1337";

export default async function (server: FastifyInstance) {
	//	server.withTypeProvider<TypeBoxTypeProvider>();

	/* Register defaults for Fastify */
	server.register(sensible);

	/* Register default headers */
	server.register(helmet, { global: true });

	await server.register(cors, {
		origin: ALLOW_ORIGINS,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		credentials: true, // Allow cookies to be sent with CORS requests
	});

	await server.register(rateLimit, {
		max: 100,
		timeWindow: "1 minute",
	});

	/* Register caching and cache headers.
	   Remember to set correct directives for user specific responses.
	   https://datatracker.ietf.org/doc/html/rfc2616#section-14.9.1*/
	server.register(caching, { expiresIn: 300, privacy: caching.privacy.PUBLIC });

	await server.register(swagger, swaggerOptions);
	await server.register(swaggerUI, swaggerOptionsUI);

	/* Register public routes */
	const publicRoutes = async (publicServer: FastifyInstance) => {
		publicServer.register(bearerAuthPlugin, { keys: BEARER_AUTH_READ_ONLY_KEYS });

		publicServer.register(userRoute);
	};

	/* Register private routes */
	const privateRoutes = async (privateServer: FastifyInstance) => {
		privateServer.register(bearerAuthPlugin, { keys: BEARER_AUTH_WRITE_KEYS });
	};

	server.register(publicRoutes);
	server.register(privateRoutes);
}
