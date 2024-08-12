import { createTrip } from "./routs/create-trip";
import fastify from "fastify";

const app = fastify();
app.register(createTrip);

app.listen({port: 3333}).then(() => {
    console.log("Server running");
});
