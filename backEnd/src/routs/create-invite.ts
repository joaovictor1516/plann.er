import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getMailClient } from "../lib/mail";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import nodemailer from "nodemailer";
import { z } from "zod";

export async function createInvite(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trips/:tripId/invite", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                name: z.string().min(4),
                email: z.string().email()
            })
        }
    }, async (request, reply) => {
        const tripId = request.params.tripId;
        const {name, email} = request.body;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        });

        if(!trip){
            return "The trip not exist.";
        } else if(!trip.is_confirmed){
            return reply.redirect(`http://localhost:3030/trips/${tripId}`);
        }

        try{
            const participant = await prisma.participant.create({
                data: {
                    name,
                    email,
                    trip_id: tripId
                }
            });

                const formatetStartDate = dayjs(trip.starts_at).format("LL");
                const formatetEndDate = dayjs(trip.ends_at).format("LL");
                
                const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`;
                const mail = await getMailClient()

                const menssage = await mail.sendMail({
                    from: {
                        name: "Equipe plann.er",
                        address: "notanswear@plann.er.com"
                    },
                    to: {
                        name: name,
                        address: email
                    },
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
            
            return reply.redirect(`http://localhost:3030/trips/${tripId}`);

        } catch(error){
            ;
        }
    });
}