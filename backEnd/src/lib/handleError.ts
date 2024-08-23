import { ZodError } from "zod";
import { BadRequest } from "./clientError";
import { FastifyInstance } from "fastify";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const handleError:FastifyErrorHandler = (error, request, reply) => {
    if(error instanceof BadRequest){
        return reply.code(400).send({
            message: error.message
        });
    } else if(error instanceof ZodError){
        return reply.code(400).send({
            message: "Invalid input",
            error: error.flatten().fieldErrors
        });
    }

    return reply.code(500).send({message: "Internal error"});
}