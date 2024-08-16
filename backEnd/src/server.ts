import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmParticipation } from "./routs/confirm-participation";
import { createActivity } from "./routs/create-activity";
import { getActivities } from "./routs/get-activities";
import { confirmTrip } from "./routs/confirm-trip";
import { createTrip } from "./routs/create-trip";
import { createLink } from "./routs/create-link";
import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify();

app.register(cors, {
    origin: "http://localhost:3030/"
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(createTrip);
app.register(createLink);
app.register(confirmTrip);
app. register(getActivities)
app.register(createActivity);
app.register(confirmParticipation);

app.listen({port: 3333}).then(() => {
    console.log("Server running");
});
