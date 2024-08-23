import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { z } from "zod";

export async function updateTrips(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().put("/trips/:tripId/update", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                destination: z.string().min(4),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date()
            })
        }
    }, async (request, reply) => {
        const tripId = request.params.tripId;
        const {destination, starts_at, ends_at} = request.body;

        if(dayjs(ends_at).isBefore(starts_at) || dayjs(starts_at).isBefore(new Date())){
            return "Invalite date";
        }

        try{
            await prisma.trip.update({
                where: {
                    id: tripId
                },
                data: {
                    destination,
                    starts_at,
                    ends_at
                }
            });

            return reply.code(200).send("trip updated successfully");
        } catch(error){
            throw new BadRequest(`${error}`);
        }
    });
}