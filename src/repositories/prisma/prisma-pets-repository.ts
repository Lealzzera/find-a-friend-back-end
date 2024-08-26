import { Prisma, Pet } from "@prisma/client";
import { PrismaPetsRepositoryInterface } from "../pets-repository.interface";
import { prisma } from "@/lib";

export class PrismaPetsRepository implements PrismaPetsRepositoryInterface {
  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });
    return pet;
  }
}
