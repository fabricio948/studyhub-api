import { Env } from "./config/env";

const env = Env.load();

console.log(`Ambiente: ${env.NODE_ENV}`);
console.log(`Servidor vai escutar em http://${env.HOST}:${env.PORT}`);
