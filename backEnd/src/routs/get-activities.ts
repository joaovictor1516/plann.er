import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "../lib/clientError";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { z } from "zod";

export async function getActivities(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/activities", {
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
                activities: {
                    orderBy: {
                        occurs_at: "asc"
                    }
                }
            }
        });

        if(!trip){
            throw new BadRequest("Trip not found");
        } else
        if(!trip.is_confirmed){
            reply.redirect(`http://localhost:3030/trips/${tripId}`);
        }

        const differenceInDaysBetwenFirstTripDateAndLastTripDate = dayjs(trip.ends_at).diff(trip.starts_at, "days");
        
        const activities = Array.from({length: differenceInDaysBetwenFirstTripDateAndLastTripDate + 2}).map((_, index) => {
            const date = dayjs(trip.starts_at).add(index, "days").toDate();
            
            return{
                date,
                activity: trip.activities.filter(activity => {
                    return dayjs(activity.occurs_at).isSame(date, "day");
                })
            }
        });

        return reply.code(200).send({activities});
    });
}