import { Pet, Prisma } from "@prisma/client";

export interface PetsRepositoryInterface {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findPetsByItsCharacteristics({
    name,
    breed,
    type,
    description,
    age,
    color,
    size,
    city,
  }: {
    name?: string;
    breed?: string;
    type?: string;
    description?: string;
    age?: string;
    color?: string;
    size?: "SMALL" | "MEDIUM" | "LARGE";
    city: string;
  }): Promise<Pet[] | null>;
}
