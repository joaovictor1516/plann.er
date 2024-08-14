import { ZodTypeProvider } from "fastify-type-provider-zod";
import localizedFormate from "dayjs/plugin/localizedFormat";
import { getMailClient } from "../lib/mail";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import nodemailer from "nodemailer";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { z } from "zod";

export async function createTrip(app: FastifyInstance){
    dayjs.extend(localizedFormate);
    dayjs.locale("pt-br");

    app.withTypeProvider<ZodTypeProvider>().post("/trips", {
        schema: {
            body: z.object({
                destination: z.string().min(4),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),
                owner_name: z.string(),
                owner_email: z.string().email(),
                emails_to_invite: z.array(z.string().email())
            })
        }
    }, async (request) => {
        const {destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite} = request.body;
        
        if(dayjs(starts_at).isBefore(new Date())){
            throw new Error("Invalid trip start date.");
        }

        if(dayjs(ends_at).isBefore(starts_at)){
            throw new Error("Invalid trip end date.");
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

        emails_to_invite.map(async (email) => {
            await mail.sendMail({
                from: {
                    name: "Equipe plann.er",
                    address: "notanswear@plann.er.com"
                },
                to: {
                    name: "Doll",
                    address: email
                },
                subject: `Confirme o convite de ${owner_name} de uma viagem para ${destination} 😊`,
                html: `
                    <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6%;">
                        <p>${owner_name} convidou você foi convidado(a) para uma viagem para <strong>${destination}</strong> nas datas <strong>${formatetStartDate} e ${formatetEndDate}</strong>.</p>
                        <br>
                        <p>Para confirmar a viagem clique no link a baixo:</p>
                        <br>
                        <p>
                            <a href="${confirmationLink}">Confirmar viagem.</a>
                        </p>
                        <br>
                        <p>Caso você não conheça ${owner_name}, apenas ignore o este e-mail.</p>
                    </div>
                `.trim()
            })
        });

        console.log(nodemailer.getTestMessageUrl(message));

        return {tripId: trip.id};
    });
}