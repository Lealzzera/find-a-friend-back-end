import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListAllPetsUseCase } from "./listAllPets";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcrypt";
import { ResourceDoesNotExistError } from "@/errors/resource-does-not-exist.error";

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryOrgRepository: InMemoryOrgRepository;
let sut: ListAllPetsUseCase;
describe("List all pets use case tests", () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryOrgRepository = new InMemoryOrgRepository();
    sut = new ListAllPetsUseCase(inMemoryPetsRepository);
  });

  it("should be able to list a pet by it's city", async () => {
    const org = await inMemoryOrgRepository.create({
      id: "01",
      cep: "00000000",
      city: "Test City",
      email: "test@test.com",
      latitude: Number("-102949372"),
      longitude: Number("-8219782189"),
      name: "Test Organization",
      neighborhood: "Test Neighborhood",
      password: await hash("123456", 6),
      phone: "0000000000",
      state: "TEST",
      street: "Test street test",
    });
    await inMemoryPetsRepository.orgDatabase.push(org);
    await inMemoryPetsRepository.create({
      age: "10 months",
      breed: "Pit Bull",
      color: "Blue nose",
      description: "A pretty, sweet and adorable pitbull",
      name: "Billy Blue Bulls",
      org_id: org.id,
      size: "LARGE",
      type: "dog",
    });
    const { pets } = await sut.exec({
      city: org.city,
    });
    expect(pets).toHaveLength(1);
    if (pets) expect(pets[0]).toMatchObject({ id: "01" });
  });

  it("should not be able to list a pet with an undefined city", async () => {
    const org = await inMemoryOrgRepository.create({
      id: "01",
      cep: "00000000",
      city: "Test City",
      email: "test@test.com",
      latitude: Number("-102949372"),
      longitude: Number("-8219782189"),
      name: "Test Organization",
      neighborhood: "Test Neighborhood",
      password: await hash("123456", 6),
      phone: "0000000000",
      state: "TEST",
      street: "Test street test",
    });
    inMemoryPetsRepository.orgDatabase.push(org);
    await inMemoryPetsRepository.create({
      age: "10 months",
      breed: "Pit Bull",
      color: "Blue nose",
      description: "A pretty, sweet and adorable pitbull",
      name: "Billy Blue Bulls",
      org_id: org.id,
      size: "LARGE",
      type: "dog",
    });
    await expect(
      sut.exec({
        city: "",
      })
    ).rejects.toBeInstanceOf(ResourceDoesNotExistError);
  });

  it("should be able to list a pet by it's carachteristics", async () => {
    const org = await inMemoryOrgRepository.create({
      id: "01",
      cep: "00000000",
      city: "Test City",
      email: "test@test.com",
      latitude: Number("-102949372"),
      longitude: Number("-8219782189"),
      name: "Test Organization",
      neighborhood: "Test Neighborhood",
      password: await hash("123456", 6),
      phone: "0000000000",
      state: "TEST",
      street: "Test street test",
    });
    await inMemoryPetsRepository.orgDatabase.push(org);
    await Promise.all([
      inMemoryPetsRepository.create({
        age: "10 months",
        breed: "Pit Bull",
        color: "black",
        description: "A pretty, sweet and adorable pitbull",
        name: "Billy Blue Bulls",
        org_id: org.id,
        size: "LARGE",
        type: "dog",
      }),
      inMemoryPetsRepository.create({
        age: "1 year",
        breed: "unknown",
        color: "black",
        description: "A pretty, sweet and adorable cat",
        name: "Black Berry",
        org_id: org.id,
        size: "SMALL",
        type: "cat",
      }),
    ]);

    const { pets } = await sut.exec({
      city: org.city,
      type: "cat",
      color: "black",
    });
    expect(pets).toHaveLength(1);
  });
});
