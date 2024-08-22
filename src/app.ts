import fastify from "fastify";
import { routes } from "./http/routes";
import { z, ZodError } from "zod";

export const app = fastify();

app.register(routes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({ message: error.issues });
  } else {
    reply.status(500).send({ message: "Internal server error." });
  }
});
