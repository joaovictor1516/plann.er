import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function createInvite(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trips/:tripId/create-invite", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                name: z.string().min(4, "O nome deve ter no minimo quatro letras"),
                email: z.string().email()
            })
        }
    }, async (request, reply) => {
        const tripId = request.params.tripId;
        const {name, email} = request.body;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        });

        if(!trip){
            return "The trip not exist.";
        } else if(!trip.is_confirmed){
            return reply.redirect(`http://localhost:3030/trips/${tripId}`);
        }

        try{
            await prisma.participant.create({
                data: {
                    name,
                    email,
                    trip_id: tripId
                }
            });

            return "Participant created successfully.";
        } catch(error){
            return error;
        }
    });
}