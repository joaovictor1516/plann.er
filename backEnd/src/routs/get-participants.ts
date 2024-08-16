import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getParticipants(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/participants", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    }, async (request, reply) => {
        const tripId = request.params.tripId;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            },
            include: {
                participants: true
            }
        });

        if(!trip){
            throw new Error("Trip not found.");
        } else
        if(!trip.is_confirmed){
            return reply.redirect(`http://localhost:3030/trips/${tripId}`);
        }

        const participants = trip.participants.map((participant) => {
            return {
                name: participant.name,
                email: participant.email,
                confirmed: participant.is_confirmed
            }
        });

        return {participants};
    });
}