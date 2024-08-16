import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function createLink(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/trips/:tripId/links", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                title: z.string().min(4),
                url: z.string().url()
            })
        }
    }, async (request, reply) => {
        const tripId = request.params.tripId;
        const {title, url} = request.body;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        });

        if(!trip){
            throw new Error("Trip not found");
        } else
        if(!trip.is_confirmed){
            return reply.redirect(`http://localhost:3030/trips/${tripId}`);
        }

        const link = await prisma.link.create({
            data: {
                title,
                url,
                trip_id: tripId
            }
        });

        return {linkId: link.id};
    })
}