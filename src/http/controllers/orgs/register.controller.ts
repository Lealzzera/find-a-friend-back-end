import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "@/useCases/orgs/register";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const orgRepository = new PrismaOrgsRepository();
    const registerUseCase = new RegisterUseCase(orgRepository);

    const registerBodySchema = z.object({
      name: z.string(),
      phone: z.string(),
      email: z.string(),
      password: z.string().min(6),
      cep: z.string(),
      state: z.string(),
      city: z.string(),
      street: z.string(),
      neighborhood: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    });

    const {
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
    } = registerBodySchema.parse(request.body);

    const passwordHash = await hash(password, 6);

    await registerUseCase.execute({
      id: randomUUID(),
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

    reply.status(201).send();
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      reply.status(409).send({ message: err.message });
    }
    throw err;
  }
}
