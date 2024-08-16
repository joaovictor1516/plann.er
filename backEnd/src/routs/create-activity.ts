import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function createActivity(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trips/:tripId/activities", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                title: z.string(),
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
            throw new Error("Trip not found");
        } else if(!trip.is_confirmed){
            return reply.redirect(`http://localhost:3030/trips/${tripId}`);
        }

        await prisma.trip.update({
            where: {
                id: tripId
            },
            data: {
                activities: {
                    create: {
                        title,
                        occurs_at
                    }
                }
            }
        });

        return "Atividade criada com sucesso";
    });
}