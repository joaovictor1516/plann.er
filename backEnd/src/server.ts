import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmParticipation } from "./routs/confirm-participation";
import { getParticipants } from "./routs/get-participants";
import { updateActivity } from "./routs/update-activities";
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
import { getLinks } from "./routs/get-links";
import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify();

app.register(cors, {
    origin: "http://localhost:3030/"
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

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
app.register(getParticipants);
app.register(confirmParticipation);

app.listen({port: 3333}).then(() => {
    console.log("Server running");
});