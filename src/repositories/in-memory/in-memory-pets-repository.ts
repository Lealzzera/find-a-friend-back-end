import { Prisma, Pet, Org } from "@prisma/client";
import { PetsRepositoryInterface } from "../pets-repository.interface";

export class InMemoryPetsRepository implements PetsRepositoryInterface {
  public petDatabase: Pet[] = [];
  public orgDatabase: Org[] = [];

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

  async findPetsByItsCharacteristics({
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
  }): Promise<Pet[] | []> {
    const orgs = this.orgDatabase.filter((org) => org.city === city);
    const orgsIdList = orgs.map((org) => org.id);
    const pets = this.petDatabase.filter((pet) => {
      return (
        orgsIdList.includes(pet.org_id) &&
        (!name || pet.name === name) &&
        (!breed || pet.breed === breed) &&
        (!type || pet.type === type) &&
        (!description || pet.description === description) &&
        (!age || pet.age === age) &&
        (!color || pet.color === color) &&
        (!size || pet.size === size)
      );
    });

    return pets;
  }
}
