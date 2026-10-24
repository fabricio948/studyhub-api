import Fastify, { type FastifyInstance } from "fastify";
import { STATUS_CODES } from "node:http";
import { HealthController } from "./modules/health/health.controller";
import { GetNoteController } from "./modules/notes/get-note.controller";
import { ListNotesController } from "./modules/notes/list-notes.controller";
import { NotesRepository } from "./modules/notes/notes.repository";
import type { ErrorResponse } from "./shared/error-response";
import { AppError } from "./shared/errors";

export interface AppOptions {
  logger: boolean;
}

export class App {
  private readonly server: FastifyInstance;

  constructor(options: AppOptions) {
    this.server = Fastify({ logger: options.logger });
    this.registerErrorHandler();
    this.registerRoutes();
  }

  private registerErrorHandler(): void {
    this.server.setErrorHandler((error, request, reply) => {
      if (error instanceof AppError) {
        const body: ErrorResponse = {
          statusCode: error.statusCode,
          error: error.error,
          message: error.message,
          details: error.details,
        };

        return reply.code(error.statusCode).send(body);
      }

      const statusCode = App.statusCodeOf(error);

      if (statusCode >= 500) {
        request.log.error(error);

        const body: ErrorResponse = {
          statusCode: 500,
          error: "Internal Server Error",
          message: "Erro interno do servidor",
        };

        return reply.code(500).send(body);
      }

      const body: ErrorResponse = {
        statusCode,
        error: STATUS_CODES[statusCode] ?? "Error",
        message: error instanceof Error ? error.message : "Requisicao invalida",
      };

      return reply.code(statusCode).send(body);
    });
  }

  private static statusCodeOf(error: unknown): number {
    if (
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
    ) {
      return error.statusCode;
    }

    return 500;
  }

  private registerRoutes(): void {
    const notesRepository = new NotesRepository();

    const healthController = new HealthController();
    const listNotesController = new ListNotesController(notesRepository);
    const getNoteController = new GetNoteController(notesRepository);

    this.server.get("/health", async () => healthController.handle());

    this.server.get("/notes", async () => listNotesController.handle());

    this.server.get("/notes/:id", async (request) =>
      getNoteController.handle(request),
    );
  }

  async listen(host: string, port: number): Promise<void> {
    await this.server.listen({ host, port });
  }

  async close(): Promise<void> {
    await this.server.close();
  }
}
