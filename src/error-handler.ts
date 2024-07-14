import type { FastifyInstance } from "fastify";
import { ClientError } from "./errors/client-error";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (err, req, reply) => {
  if (err instanceof ZodError) {
    return reply.code(400).send({
      message: "Invalid input",
      errors: err.flatten().fieldErrors
    });
  }

  if (err instanceof ClientError) {
    return reply.code(400).send(err.message);
  }

  return reply.code(500).send({message: "Internal server error"});
};
