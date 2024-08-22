import { ZodTypeProvider } from "fastify-type-provider-zod";
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
    }, async (request) => {
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
            return "The participant not found.";
        }

        return {participant};
    });
}