import { InvalidOrgCredentialsError } from "@/errors/invalid-org-credentials.error";
import { makeAuthenticateUseCase } from "@/useCases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    const { email, password } = authenticateBodySchema.parse(request.body);
    const { org } = await authenticateUseCase.exec({ email, password });

    return reply.status(200).send({ org });
  } catch (err) {
    if (err instanceof InvalidOrgCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}
