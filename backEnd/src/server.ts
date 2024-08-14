import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routs/confirm-trip";
import { createTrip } from "./routs/create-trip";
import fastify from "fastify";

const app = fastify();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(createTrip);
app.register(confirmTrip);

app.listen({port: 3333}).then(() => {
    console.log("Server running");
});
