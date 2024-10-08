import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcrypt";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InvalidOrgCredentialsError } from "@/errors/invalid-org-credentials.error";

let inMemoryOrgRepository: InMemoryOrgRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use case tests", () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository();
    sut = new AuthenticateUseCase(inMemoryOrgRepository);
  });

  it("should be able to authenticate", async () => {
    const password = "test123456";
    const orgRegistered = await inMemoryOrgRepository.create({
      name: "test ORG",
      email: "test@test.com",
      phone: "11999999999",
      password: await hash(password, 6),
      cep: "06160040",
      state: "São Paulo",
      city: "Test city",
      street: "Test address number 0101",
      neighborhood: "Test neighborhood",
      latitude: Number("-102949372"),
      longitude: Number("-8219782189"),
    });

    const { org } = await sut.exec({
      email: orgRegistered.email,
      password,
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong password", async () => {
    const orgRegistered = await inMemoryOrgRepository.create({
      name: "test ORG",
      email: "test@test.com",
      phone: "11999999999",
      password: await hash("test123456", 6),
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
        email: orgRegistered.email,
        password: "test12345D",
      })
    ).rejects.toBeInstanceOf(InvalidOrgCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await expect(() =>
      sut.exec({
        email: "test@test.com",
        password: "test12345D",
      })
    ).rejects.toBeInstanceOf(InvalidOrgCredentialsError);
  });
});
