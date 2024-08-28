import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";
import { makeRegisterUseCase } from "@/useCases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerUseCase = makeRegisterUseCase();

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

    await registerUseCase.exec({
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

    reply.status(201).send();
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      reply.status(409).send({ message: err.message });
    }
    throw err;
  }
}
