import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { env } from "../lib/envSchema";
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
            throw new BadRequest("Trip not found");
        } else
        if(!trip.is_confirmed){
            reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`);
        }

        const links = trip.links.map((link) => {
            return {
                id: link.id,
                title: link.title,
                url: link.url
            }
        });

        return reply.code(200).send({links});
    });
}