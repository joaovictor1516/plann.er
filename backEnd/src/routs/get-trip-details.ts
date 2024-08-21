import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getTripDetails(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/details", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    }, async (request, routs) => {
        const tripId = request.params.tripId;

        const trip = await prisma.trip.findFirst({
            where: {
                id: tripId
            }
        }) ;

        if(!trip){
            return "The trip not found.";
        } else if(!trip.is_confirmed){
            return routs.redirect(`http://localhost:3030/trips/${tripId}`);
        }

        return {trip};
    });
}