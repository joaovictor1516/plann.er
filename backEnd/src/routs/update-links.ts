import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function updateLinks(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().put("/links/:linkId/update", {
        schema: {
            params: z.object({
                linkId: z.string().uuid()
            }),
            body: z.object({
                title: z.string().min(4),
                url: z.string().url()
            })
        }
    }, async (request) => {
        const linkId = request.params.linkId;
        const {title, url} = request.body;

        try{
            await prisma.link.update({
                where: {
                    id: linkId
                },
                data: {
                    title,
                    url
                }
            });

            return "Link uptadet successfully.";
        } catch(error){
            return error;
        }
    });
}