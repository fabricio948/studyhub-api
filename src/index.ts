import { App } from "./app";
import { Env } from "./config/env";

async function bootstrap(): Promise<void> {
  const env = Env.load();
  const app = new App({ logger: env.NODE_ENV !== "test" });

  await app.listen(env.HOST, env.PORT);
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
