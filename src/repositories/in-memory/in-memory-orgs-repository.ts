import { Prisma, Org } from "@prisma/client";
import { PrismaOrgsRepository } from "../prisma/prisma-orgs-repository";

export class InMemoryOrgRepository implements PrismaOrgsRepository {
  public orgDatabase: Org[] = [];
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: "id-01",
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      cep: data.cep,
      state: data.state,
      city: data.city,
      street: data.street,
      neighborhood: data.neighborhood,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.orgDatabase.push(org);

    return org;
  }
  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgDatabase.find((org) => org.email === email);

    return org ? org : null;
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgDatabase.find((org) => org.id === id);
    return org ? org : null;
  }
}
