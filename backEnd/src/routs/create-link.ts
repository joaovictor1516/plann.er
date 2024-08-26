import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { env } from "../lib/envSchema";
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
            throw new BadRequest("Trip not found");
        } else
        if(!trip.is_confirmed){
            return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`);
        }

        const link = await prisma.link.create({
            data: {
                title,
                url,
                trip_id: tripId
            }
        });

        return reply.code(200).send({linkId: link.id});
    })
}