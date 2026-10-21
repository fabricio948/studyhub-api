import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  HOST: z.string().default("127.0.0.1"),
  PORT: z.coerce.number().int().positive().default(3333),
});

export type EnvVars = z.infer<typeof envSchema>;

export class Env {
  static load(): EnvVars {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
      console.error("Variaveis de ambiente invalidas:");
      console.error(z.prettifyError(result.error));
      process.exit(1);
    }

    return result.data;
  }
}
