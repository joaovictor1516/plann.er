import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function updateActivity(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().put("/activities/:activityId/update", {
        schema: {
            params: z.object({
                activityId: z.string().uuid()
            }),
            body: z.object({
                title: z.string().min(4),
                occurs_at: z.coerce.date()
            })
        }
    }, async (request) => {
        const activityId = request.params.activityId;
        const {title, occurs_at} = request.body;

        try {
            await prisma.activity.update({
                where: {
                    id: activityId
                },
                data: {
                    title,
                    occurs_at
                }
            });

            return "Activity updated successfully";
        } catch(error) {
            return error;
        }
    });
}