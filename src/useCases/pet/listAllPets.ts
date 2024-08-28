import { ResourceDoesNotExistError } from "@/errors/resource-does-not-exist.error";
import { PetsRepositoryInterface } from "@/repositories/pets-repository.interface";
import { Pet } from "@prisma/client";

interface ListAllPetsUseCaseRequestInterface {
  name?: string;
  breed?: string;
  type?: string;
  description?: string;
  age?: string;
  color?: string;
  size?: "SMALL" | "MEDIUM" | "LARGE";
  city: string;
}

interface ListAllPetsUseCaseResponseInterface {
  pets: Pet[] | null;
}

export class ListAllPetsUseCase {
  constructor(private petsRepository: PetsRepositoryInterface) {}
  async exec({
    name,
    breed,
    type,
    description,
    age,
    color,
    size,
    city,
  }: ListAllPetsUseCaseRequestInterface): Promise<ListAllPetsUseCaseResponseInterface> {
    if (!city) {
      throw new ResourceDoesNotExistError();
    }
    const pet = await this.petsRepository.findPetsByItsCharacteristics({
      name,
      breed,
      type,
      description,
      age,
      color,
      size,
      city,
    });

    return { pets: pet };
  }
}
