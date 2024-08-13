import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function createTrip(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trips", {
        schema: {
            body: z.object({
                destination: z.string().min(4),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date()
            })
        }
    }, async (request) => {
        const {destination, starts_at, ends_at} = request.body;
        
        await prisma.trip.create({
            data:{
                destination,
                starts_at,
                ends_at
            }
        });

        return "Viagem criada com sucesso"
    });
}