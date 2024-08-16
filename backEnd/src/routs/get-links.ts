import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getLinks(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/links", {
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
                links: true
            }
        });

        if(!trip){
            throw new Error("Trip not found");
        } else
        if(!trip.is_confirmed){
            reply.redirect(`http://localhost:3030/trips/${tripId}`);
        }

        const links = trip.links.map((link) => {
            return {
                title: link.title,
                url: link.url
            }
        });

        return {links};
    });
}