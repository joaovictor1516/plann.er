import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function confirmTrip(app: FastifyInstance){

    app.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/confirm", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    }, async (request) => {
        const tripId = request.params.tripId;

        await prisma.trip.update({
            where: {
                id: tripId
            },
            data: {
                is_confirmed: true
            }
        })

        return "Confirmação da criação da viagem 😊!";
    });
}