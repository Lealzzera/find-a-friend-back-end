import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";
import { OrgsRepositoryInterface } from "@/repositories/orgs-repository.interface";
import { Org } from "@prisma/client";
import { hash } from "bcrypt";

interface RegisterOrgUseCaseRequestInterface {
  name: string;
  phone: string;
  email: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
}

interface RegisterOrgUseCaseResponseInterface {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgsRepositoryInterface) {}
  async exec({
    name,
    phone,
    email,
    password,
    cep,
    state,
    city,
    street,
    neighborhood,
    latitude,
    longitude,
  }: RegisterOrgUseCaseRequestInterface): Promise<RegisterOrgUseCaseResponseInterface> {
    const orgWithSameEmail = await this.orgRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);
    const org = await this.orgRepository.create({
      name,
      phone,
      email,
      password: passwordHash,
      cep,
      state,
      city,
      street,
      neighborhood,
      latitude,
      longitude,
    });

    return { org };
  }
}
