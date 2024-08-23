import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function deleteLink(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().delete("/links/:linkId/delete", {
        schema: {
            params: z.object({
                linkId: z.string().uuid()
            })
        }
    }, async (request, reply) => {
        const linkId = request.params.linkId;

        try {
            await prisma.link.delete({
                where: {
                    id: linkId
                }
            });
            
            return reply.code(200).send("Link deleted successfully.");
        } catch(error) {
            throw new BadRequest(`${error}`);
        }
    });
}