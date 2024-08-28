import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { RegisterPetUseCase } from "./register";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcrypt";
import { ResourceDoesNotExistError } from "@/errors/resource-does-not-exist.error";

let inMemoryPetRepository: InMemoryPetsRepository;
let inMemoryOrgRepository: InMemoryOrgRepository;
let sut: RegisterPetUseCase;

describe("Register pets use case tests", () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetsRepository();
    inMemoryOrgRepository = new InMemoryOrgRepository();
    sut = new RegisterPetUseCase(inMemoryPetRepository, inMemoryOrgRepository);
  });

  it("should be able to register a pet", async () => {
    const passwordHashed = await hash("test12345", 6);

    const org = await inMemoryOrgRepository.create({
      name: "test ORG",
      email: "test@test.com",
      phone: "11999999999",
      password: passwordHashed,
      cep: "06160040",
      state: "São Paulo",
      city: "Test city",
      street: "Test address number 0101",
      neighborhood: "Test neighborhood",
      latitude: Number("-102949372"),
      longitude: Number("-8219782189"),
    });

    const { pet } = await sut.exec({
      name: "Bob",
      breed: "poodle",
      color: "white",
      size: "SMALL",
      type: "dog",
      description: "Its a small, sweet, adorable and beautiful dog.",
      age: "10 months",
      org_id: org.id,
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to register a pet with an invalid org id", async () => {
    await inMemoryOrgRepository.create({
      name: "test ORG",
      email: "test@test.com",
      phone: "11999999999",
      password: await hash("test12345", 6),
      cep: "06160040",
      state: "São Paulo",
      city: "Test city",
      street: "Test address number 0101",
      neighborhood: "Test neighborhood",
      latitude: Number("-102949372"),
      longitude: Number("-8219782189"),
    });

    await expect(() =>
      sut.exec({
        name: "Bob",
        breed: "poodle",
        color: "white",
        size: "SMALL",
        type: "dog",
        description: "Its a small, sweet, adorable and beautiful dog.",
        age: "10 months",
        org_id: "id-00001",
      })
    ).rejects.toBeInstanceOf(ResourceDoesNotExistError);
  });
});
