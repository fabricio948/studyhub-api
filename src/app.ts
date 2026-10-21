import Fastify, { type FastifyInstance } from "fastify";
import { HealthController } from "./modules/health/health.controller";

export interface AppOptions {
  logger: boolean;
}

export class App {
  private readonly server: FastifyInstance;

  constructor(options: AppOptions) {
    this.server = Fastify({ logger: options.logger });
    this.registerRoutes();
  }

  private registerRoutes(): void {
    const healthController = new HealthController();

    this.server.get("/health", async () => healthController.handle());
  }

  async listen(host: string, port: number): Promise<void> {
    await this.server.listen({ host, port });
  }

  async close(): Promise<void> {
    await this.server.close();
  }
}