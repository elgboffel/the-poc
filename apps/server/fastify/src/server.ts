import root from "./root";
import fastify from "fastify";

// Create an http server. We pass the relevant typings for our http version used.
// By passing types we get correctly typed access to the underlying http objects in routes.
// If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
const server = fastify({ logger: true });

server.register(root);

// Start your server
server.listen({ port: 3002 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
