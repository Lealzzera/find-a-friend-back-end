import fastify from "fastify";
import { routes } from "./http/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: "10d" },
});

app.register(routes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({ message: error.issues });
  } else {
    reply.status(500).send({ message: "Internal server error." });
  }
});
