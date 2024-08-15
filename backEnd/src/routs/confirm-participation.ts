import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function confirmParticipation(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/confirm/:participantId", {
        schema: {
            params: z.object({
                tripId: z.string().uuid(),
                participantId: z.string().uuid()
            })
        }
    }, async (request, reply) => {
        const {tripId, participantId} = request.params;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        });

        const participant = await prisma.participant.findUnique({
            where: {
                id: participantId,
                trip_id: tripId
            }
        });

        if(!trip?.is_confirmed){
            return reply.redirect(`http://localhost:3333/trips/${tripId}/confirm`);
        } else if(participant?.is_confirmed){
            return reply.redirect(`http://localhost:3030/trips/${tripId}`);
        }

        await prisma.participant.update({
            where: {
                id: participantId,
                trip_id: tripId
            },
            data: {
                is_confirmed: true
            }
        });

        return reply.redirect(`http://localhost:3030/trips/${tripId}`);
    })
}