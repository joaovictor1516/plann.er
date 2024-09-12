import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function completeActivity(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/activities/:activityId/complete", {
         schema: {
            params: z.object({
                activityId: z.string().uuid()
            }) 
         }
    }, async(request, reply) => {
        const activityId = request.params.activityId;

        const activity = await prisma.activity.findUnique({
            where: {
                id: activityId
            }
        });

        if(!activity){
            throw new BadRequest("Activity not founded.");
        } else if(activity.is_complited){
            return "The activity is already done."
        }

        try{
            await prisma.activity.update({
                where: {
                    id: activityId,
                },
                data: {
                    is_complited: true
                }
            });

            return reply.code(200).send("Done.");
        } catch(error){
            throw new BadRequest(`${error}`);
        }
    });
}