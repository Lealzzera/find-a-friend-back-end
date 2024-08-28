import { Prisma, Pet } from "@prisma/client";
import { PetsRepositoryInterface } from "../pets-repository.interface";

export class InMemoryPetsRepository implements PetsRepositoryInterface {
  public petDatabase: Pet[] = [];
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: "01",
      name: data.name,
      breed: data.breed,
      color: data.color,
      size: data.size,
      type: data.type,
      description: data.description,
      age: data.age,
      org_id: data.org_id,
    };

    this.petDatabase.push(pet);

    return pet;
  }
}
