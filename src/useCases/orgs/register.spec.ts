import { it, describe, expect, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { compare, hash } from "bcrypt";
import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";

let inMemoryOrgRepository: InMemoryOrgRepository;
let sut: RegisterUseCase;

describe("register use case tests", () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository();
    sut = new RegisterUseCase(inMemoryOrgRepository);
  });

  it("should be able to register an ORG", async () => {
    const passwordHashed = await hash("test123456", 6);
    const { org } = await sut.exec({
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

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to register with same email twice", async () => {
    const passwordHashed = await hash("test123456", 6);
    await sut.exec({
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

    await expect(
      sut.exec({
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
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("should password be hashed", async () => {
    const { org } = await sut.exec({
      name: "test ORG",
      email: "test@test.com",
      phone: "11999999999",
      password: "test123456",
      cep: "06160040",
      state: "São Paulo",
      city: "Test city",
      street: "Test address number 0101",
      neighborhood: "Test neighborhood",
      latitude: Number("-102949372"),
      longitude: Number("-8219782189"),
    });
    const comparePassword = await compare("test123456", org.password);

    expect(comparePassword).toBeTruthy();
  });
});
