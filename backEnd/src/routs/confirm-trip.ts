import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { getMailClient } from "../lib/mail";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { env } from "../lib/envSchema";
import { dayjs } from "../lib/dayjs";
import nodemailer from "nodemailer";
import { z } from "zod";

export async function confirmTrip(app: FastifyInstance){
    const mail = await getMailClient();

    app.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/confirm", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    }, async (request, reply) => {
        const tripId = request.params.tripId;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            },
            include: {
                participants:{
                    where: {
                        is_owner: false
                    }
                }
            }
        });

        if(!trip){
            throw new BadRequest("Trip not found");
        } else if(trip.is_confirmed){
            return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`);
        }

        await prisma.trip.update({
            where: {
                id: tripId
            },
            data: {
                is_confirmed: true
            }
        });

        const formatetStartDate = dayjs(trip.starts_at).format("LL");
        const formatetEndDate = dayjs(trip.ends_at).format("LL");

            await Promise.all(    
                trip.participants.map(async (participant: { id: string; email: string; }) => {
                    const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`;

                    const menssage = await mail.sendMail({
                        from: {
                            name: "Equipe plann.er",
                            address: "notanswear@plann.er.com"
                        },
                        to: participant.email,
                        subject: `Confirme o convite de uma viagem para ${trip.destination} 😊`,
                        html: `
                            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6%;">
                                <p>Você foi convidado(a) para uma viagem para <strong>${trip.destination}</strong> nas datas <strong>${formatetStartDate} e ${formatetEndDate}</strong>.</p>
                                <br>
                                <p>Para confirmar sua preseça na viagem, clique no link a baixo:</p>
                                <br>
                                <p>
                                    <a href="${confirmationLink}">Confirmar viagem.</a>
                                </p>
                                <br>
                                <p>Caso está mensagem seja estranha para você, apenas ignore o este e-mail.</p>
                            </div>
                        `.trim()
                    });

                    console.log(nodemailer.getTestMessageUrl(menssage));
                })
            );
            
        return reply.code(200).send({tripId});
    });
}