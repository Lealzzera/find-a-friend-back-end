import { InvalidSizeError } from "@/errors/invalid-size.error";
import { ResourceDoesNotExistError } from "@/errors/resource-does-not-exist.error";
import { OrgsRepositoryInterface } from "@/repositories/orgs-repository.interface";
import { PetsRepositoryInterface } from "@/repositories/pets-repository.interface";
import { Pet, Size } from "@prisma/client";

interface RegisterPetUseCaseRequestInterface {
  name: string;
  breed: string;
  color: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
  type: string;
  description: string;
  age: string;
  org_id: string;
}

interface RegisterPetUseCaseResponseInterface {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepositoryInterface,
    private orgsRepository: OrgsRepositoryInterface
  ) {}
  async exec({
    name,
    breed,
    color,
    size,
    type,
    description,
    age,
    org_id,
  }: RegisterPetUseCaseRequestInterface): Promise<RegisterPetUseCaseResponseInterface> {
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new ResourceDoesNotExistError();
    }
    const validSizes: Size[] = ["SMALL", "MEDIUM", "LARGE"];

    if (!validSizes.includes(size as Size)) {
      throw new InvalidSizeError();
    }
    const pet = await this.petsRepository.create({
      name,
      breed,
      color,
      size,
      type,
      description,
      age,
      org_id,
    });

    return { pet };
  }
}
