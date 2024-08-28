import { Prisma, Pet } from "@prisma/client";
import { PetsRepositoryInterface } from "../pets-repository.interface";
import { prisma } from "@/lib";

export class PrismaPetsRepository implements PetsRepositoryInterface {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });
    return pet;
  }
}
