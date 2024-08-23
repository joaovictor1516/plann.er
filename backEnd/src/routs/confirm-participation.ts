import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function confirmParticipation(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/participants/:participantId/confirm", {
        schema: {
            params: z.object({
                participantId: z.string().uuid()
            })
        }
    }, async (request, reply) => {
        const participantId = request.params.participantId;

        const participant = await prisma.participant.findUnique({
            where: {
                id: participantId
            }
        });

        if(!participant){
            throw new BadRequest("Participant not founded.");
        }else if(participant.is_confirmed){
            return reply.redirect(`http://localhost:3030/trips/${participant.trip_id}`);
        }

        await prisma.participant.update({
            where: {
                id: participantId
            },
            data: {
                is_confirmed: true
            }
        });

        return reply.code(300).redirect(`http://localhost:3030/trips/${participant?.trip_id}`);
    })
}