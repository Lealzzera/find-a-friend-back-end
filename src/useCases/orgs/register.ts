import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";
import { OrgsRepositoryInterface } from "@/repositories/orgs-repository.interface";

interface RegisterUseCaseInterface {
  id: string;
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

export class RegisterUseCase {
  constructor(private orgRepository: OrgsRepositoryInterface) {}
  async execute({
    id,
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
  }: RegisterUseCaseInterface) {
    const org = await this.orgRepository.findByEmail(email);
    if (org) {
      throw new EmailAlreadyExistsError();
    }
    await this.orgRepository.create({
      id,
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
    });
  }
}
