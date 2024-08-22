import { FastifyInstance } from "fastify";
import { register } from "./controllers/orgs/register.controller";

export async function routes(app: FastifyInstance) {
  app.post("/register", register);
}
