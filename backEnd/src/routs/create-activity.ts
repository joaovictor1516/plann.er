import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { z } from "zod";

export async function createActivity(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trips/:tripId/activities", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                title: z.string().min(4),
                occurs_at: z.coerce.date()
            })

        }
    }, async (request, reply) => {
        const tripId = request.params.tripId;
        const {title, occurs_at} = request.body;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        });

        if(!trip){
            throw new BadRequest("Trip not found");
        } else
        if(!trip.is_confirmed){
            return reply.redirect(`http://localhost:3030/trips/${tripId}`);
        } else
        if(dayjs(occurs_at).isBefore(trip.starts_at) || dayjs(occurs_at).isAfter(trip.ends_at)){
            throw new BadRequest("Invalit activity date");
        }

        const activity = await prisma.activity.create({
            data: {
                title,
                occurs_at,
                trip_id: tripId
            }
        });

        return reply.code(200).send({activityId: activity.id});
    });
}