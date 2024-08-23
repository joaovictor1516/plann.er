import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function deleteActivity(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().delete("/activities/:activityId/delete", {
        schema: {
            params: z.object({
                activityId: z.string().uuid() 
            })
        }
    }, async (request, reply) => {
        const activityId = request.params.activityId;

        try{
            await prisma.activity.delete({
                where: {
                    id: activityId
                }
            });
            
            return reply.code(200).send("Activity delete succesfully.");
        } catch(error){
            throw new BadRequest(`${error}`);
        }  
    });
}