import { FastifyInstance } from "fastify";
import { register } from "./controllers/orgs/register.controller";
import { authenticate } from "./controllers/orgs/authenticate.controller";
import { listAllPets } from "./controllers/pets/listAllPets";
import { registerPet } from "./controllers/pets/register";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function routes(app: FastifyInstance) {
  app.post("/orgs", register);
  app.post("/sessions", authenticate);
  app.get("/list-pets", listAllPets);
  app.post("/pets", { onRequest: [verifyJWT] }, registerPet);
}
