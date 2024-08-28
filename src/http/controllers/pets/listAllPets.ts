import { ResourceDoesNotExistError } from "@/errors/resource-does-not-exist.error";
import { makeListAllPetsUseCase } from "@/useCases/factories/make-list-all-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listAllPets(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listAllPetsQuerySchema = z.object({
      name: z.string().optional(),
      breed: z.string().optional(),
      color: z.string().optional(),
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
      type: z.string().optional(),
      description: z.string().optional(),
      age: z.string().optional(),
      city: z.string(),
    });

    const { name, breed, color, size, type, description, age, city } =
      listAllPetsQuerySchema.parse(request.query);

    const listAllPetsUseCase = makeListAllPetsUseCase();

    const petsList = await listAllPetsUseCase.exec({
      name,
      breed,
      color,
      size,
      type,
      description,
      age,
      city,
    });

    return reply.status(200).send(petsList);
  } catch (err) {
    if (err instanceof ResourceDoesNotExistError) {
      return reply.status(404).send({ message: err.message });
    } else {
      throw err;
    }
  }
}
