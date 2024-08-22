import { prisma } from "@/lib";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    password: z.string(),
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

  await prisma.org.create({
    data: {
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
    },
  });

  reply.status(201).send();
}
