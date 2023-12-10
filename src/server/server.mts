import Fastify from "fastify";
import { createReadStream } from "node:fs";
import fastifyStatic from "@fastify/static";

const fastify = Fastify({
  logger: true,
});

const root = import.meta.url;
console.log("root:", new URL("../../public", import.meta.url));

fastify.register(fastifyStatic, {
  root: new URL("../../public", import.meta.url),
  prefix: "/public/", // optional: default '/'
  // constraints: { host: "example.com" }, // optional: default {}
});

// Declare a route
fastify.get("/", (_request, reply) => {
  reply.send({ hello: "world" });
});

fastify.get("/password-manager", (_request, reply) => {
  const htmlPath = new URL("../../index.html", import.meta.url);
  console.log({ htmlPath });
  const stream = createReadStream(htmlPath);
  reply.type("text/html").send(stream);
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server is listening on http://localhost:3000");
});
