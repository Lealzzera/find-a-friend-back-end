import { Pet, Prisma } from "@prisma/client";

export interface PrismaPetsRepositoryInterface {
  create(data: Prisma.PetCreateInput): Promise<Pet | null>;
}
