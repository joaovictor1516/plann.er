import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { getMailClient } from "../lib/mail";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import nodemailer from "nodemailer";
import { z } from "zod";

export async function createTrip(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trips", {
        schema: {
            body: z.object({
                emails_to_invite: z.array(z.string().email()),
                owner_email: z.string().email(),
                destination: z.string().min(4),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),
                owner_name: z.string(),
            })
        }
    }, async (request, reply) => {
        const {destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite} = request.body;
        
        if(dayjs(starts_at).isBefore(new Date())){
            throw new BadRequest("Invalid trip start date.");
        }

        if(dayjs(ends_at).isBefore(starts_at)){
            throw new BadRequest("Invalid trip end date.");
        }

        const trip = await prisma.trip.create({
            data:{
                destination,
                starts_at,
                ends_at,
                participants:{
                    createMany: {        
                        data: [
                            {
                                name: owner_name,
                                email: owner_email,
                                is_owner :true,
                                is_confirmed: true
                            },
                            ...emails_to_invite.map(email => {
                                return {
                                    email
                                }
                            })
                        ]
                    }
                }
            }
        });

        const formatetStartDate = dayjs(starts_at).format("LL");
        const formatetEndDate = dayjs(ends_at).format("LL");

        const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm`;

        const mail = await getMailClient();

        const message = await mail.sendMail({
            from: {
                name: "Equipe plann.er",
                address: "notanswear@plann.er.com"
            },
            to: {
                name: owner_name,
                address: owner_email
            },
            subject: `Confirme sua viagem para ${destination} 😊`,
            html: `
                <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6%;">
                    <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas <strong>${formatetStartDate} e ${formatetEndDate}</strong>.</p>
                    <br>
                    <p>Para confirmar a viagem clique no link a baixo:</p>
                    <br>
                    <p>
                        <a href="${confirmationLink}">Confirmar viagem.</a>
                    </p>
                    <br>
                    <p>Caso você não sáiba do que se trata este e-mail, apenas ignore-o.</p>
                </div>
            `.trim()
        });

        console.log(nodemailer.getTestMessageUrl(message));

        return reply.code(200).send({tripId: trip.id});
    });
}