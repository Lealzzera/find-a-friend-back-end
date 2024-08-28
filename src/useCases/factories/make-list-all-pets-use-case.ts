import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { ListAllPetsUseCase } from "../pet/listAllPets";

export function makeListAllPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const listAllPetsUseCase = new ListAllPetsUseCase(petsRepository);

  return listAllPetsUseCase;
}
