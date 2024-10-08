import fastify from "fastify";
import { routes } from "./http/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);
app.register(routes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({ message: error.issues });
  } else {
    reply.status(500).send({ message: "Internal server error." });
  }
});
