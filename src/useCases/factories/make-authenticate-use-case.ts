import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateUseCase } from "../authenticate/authenticate";

export function makeAuthenticateUseCase() {
  const orgRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new AuthenticateUseCase(orgRepository);

  return authenticateUseCase;
}
