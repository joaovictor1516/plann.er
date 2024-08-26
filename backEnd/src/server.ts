import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmParticipation } from "./routs/confirm-participation";
import { getParticipants } from "./routs/get-participants";
import { updateActivity } from "./routs/update-activities";
import { getTripDetails } from "./routs/get-trip-details";
import { getParticipant } from "./routs/get-participant";
import { deleteActivity } from "./routs/delete-activity";
import { createActivity } from "./routs/create-activity";
import { getActivities } from "./routs/get-activities";
import { createInvite } from "./routs/create-invite";
import { confirmTrip } from "./routs/confirm-trip";
import { updateLinks } from "./routs/update-links";
import { updateTrips } from "./routs/update-trips";
import { createTrip } from "./routs/create-trip";
import { createLink } from "./routs/create-link";
import { deleteLink } from "./routs/delete-link";
import { handleError } from "./lib/handleError";
import { getLinks } from "./routs/get-links";
import { env } from "./lib/envSchema";
import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify();

app.register(cors, {
    origin: env.WEB_BASE_URL
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(handleError);

app.register(getLinks);
app.register(deleteLink);
app.register(createTrip);
app.register(createLink);
app.register(updateLinks);
app.register(confirmTrip);
app.register(updateTrips);
app.register(createInvite);
app.register(getActivities);
app.register(createActivity);
app.register(deleteActivity);
app.register(updateActivity);
app.register(getTripDetails);
app.register(getParticipant);
app.register(getParticipants);
app.register(confirmParticipation);

app.listen({port: env.PORT}).then(() => {
    console.log("Server running");
});