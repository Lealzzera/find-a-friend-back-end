import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../pet/register";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const registerPetUseCase = new RegisterPetUseCase(
    petsRepository,
    orgsRepository
  );

  return registerPetUseCase;
}
