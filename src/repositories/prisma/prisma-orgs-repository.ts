import { Prisma, Org } from "@prisma/client";
import { prisma } from "@/lib";
import { OrgRepositoryInterface } from "../orgs-repository.interface";

export class PrismaOrgsRepository implements OrgRepositoryInterface {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data });
    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { email } });
    return org;
  }
}
