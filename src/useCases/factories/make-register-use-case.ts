import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "../orgs/register";

export function makeRegisterUseCase() {
  const orgRepository = new PrismaOrgsRepository();
  const registerUseCase = new RegisterUseCase(orgRepository);

  return registerUseCase;
}
