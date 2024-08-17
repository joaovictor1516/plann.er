import { ZodTypeProvider } from "fastify-type-provider-zod";
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
    }, async (request) => {
        const activityId = request.params.activityId;

        if(!activityId){
            return "Activity not found.";
        }

        try{
            await prisma.activity.delete({
                where: {
                    id: activityId
                }
            });
            return "Activity delete succesfully.";
        } catch(error){
            console.error(`Erro: ${error}`);
            return;
        }  
    });
}