import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routs/confirm-trip";
import { createTrip } from "./routs/create-trip";
import cors from "@fastify/cors";
import fastify from "fastify";
import { confirmParticipation } from "./routs/confirm-participation";

const app = fastify();

app.register(cors, {
    origin: "http://localhost:3030/"
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipation);

app.listen({port: 3333}).then(() => {
    console.log("Server running");
});
