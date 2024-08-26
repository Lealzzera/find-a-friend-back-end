import { InvalidOrgCredentialsError } from "@/errors/invalid-org-credentials.error";
import { OrgsRepositoryInterface } from "@/repositories/orgs-repository.interface";
import { Org } from "@prisma/client";
import { compare } from "bcrypt";

interface AuthenticateUseCaseRequestInterface {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponseInterface {
  org: Org | null;
}

export class Authenticate {
  constructor(private orgRepository: OrgsRepositoryInterface) {}
  async exec({
    email,
    password,
  }: AuthenticateUseCaseRequestInterface): Promise<AuthenticateUseCaseResponseInterface> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new InvalidOrgCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password);

    if (!doesPasswordMatches) {
      throw new InvalidOrgCredentialsError();
    }

    return { org };
  }
}
