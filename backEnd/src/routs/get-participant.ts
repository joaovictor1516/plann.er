import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getParticipant(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/participants/:participantId", {
        schema: {
            params: z.object({
                participantId: z.string().uuid()
            })
        }
    }, async (request, reply) => {
        const participantId = request.params.participantId;

        const participant = await prisma.participant.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                is_confirmed: true
            },
            where: {
                id: participantId
            }
        }) ;

        if(!participant){
            throw new BadRequest("The participant not found.");
        }

        return reply.code(200).send({participant});
    });
}