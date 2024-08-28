import { InvalidSizeError } from "@/errors/invalid-size.error";
import { ResourceDoesNotExistError } from "@/errors/resource-does-not-exist.error";
import { makeRegisterPetUseCase } from "@/useCases/factories/make-register-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerPetUseCase = makeRegisterPetUseCase();
    const registerPetBodySchema = z.object({
      name: z.string(),
      breed: z.string(),
      color: z.string(),
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
      type: z.string(),
      description: z.string(),
      age: z.string(),
      org_id: z.string(),
    });

    const { name, breed, color, size, type, description, age, org_id } =
      registerPetBodySchema.parse(request.body);

    await registerPetUseCase.exec({
      name,
      breed,
      color,
      size,
      type,
      description,
      age,
      org_id,
    });

    reply.status(201).send();
  } catch (err) {
    if (err instanceof ResourceDoesNotExistError) {
      return reply.status(400).send({ message: err.message });
    }
    if (err instanceof InvalidSizeError) {
      return reply.status(400).send({ message: err.message });
    } else {
      throw err;
    }
  }
}
