import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getActivity(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/activities/:activityId", {
        schema:{
            params: z.object({
                activityId: z.string().uuid()
            })
        }
    }, async (request, reply) => {
        const activityId = request.params.activityId;

        const activity = await prisma.activity.findUnique({
            where: {
                id: activityId
            }
        });

        if(!activity){
           throw new BadRequest("Activity not founded.");
        }

        return reply.code(200).send({activity});
    });
}