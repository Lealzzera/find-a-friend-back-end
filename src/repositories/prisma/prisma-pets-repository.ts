import { Prisma, Pet } from "@prisma/client";
import { PetsRepositoryInterface } from "../pets-repository.interface";
import { prisma } from "@/lib";

export class PrismaPetsRepository implements PetsRepositoryInterface {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });
    return pet;
  }

  async findPetsByItsCharacteristics({
    city,
    name,
    breed,
    type,
    description,
    age,
    color,
    size,
  }: {
    city: string;
    name: string;
    breed: string;
    type: string;
    description: string;
    age: string;
    color: string;
    size: "SMALL" | "MEDIUM" | "LARGE";
  }): Promise<Pet[] | null> {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
    });

    const orgsId = orgs.map((org) => org.id);
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgsId,
        },
        ...(name && { name }),
        ...(breed && { breed }),
        ...(type && { type }),
        ...(description && { description }),
        ...(age && { age }),
        ...(color && { color }),
        ...(size && { size }),
      },
    });

    return pets;
  }
}
