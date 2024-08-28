import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterOrgUseCase } from "../orgs/register";

export function makeRegisterOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository();
  const registerOrgUseCase = new RegisterOrgUseCase(orgRepository);

  return registerOrgUseCase;
}
