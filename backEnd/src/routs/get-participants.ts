import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { env } from "../lib/envSchema";
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
            throw new BadRequest("Trip not found");
        } else
        if(!trip.is_confirmed){
            return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`);
        }

        const participants = trip.participants.map((participant) => {
            return {
                id: participant.id,
                name: participant.name,
                email: participant.email,
                owner: participant.is_owner,
                confirmed: participant.is_confirmed
            }
        });

        return reply.code(200).send({participants});
    });
}